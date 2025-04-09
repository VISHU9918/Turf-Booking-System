package com.example.turf.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.turf.model.User;  // Ensure this points to the correct User entity for your Turf Booking System
import com.example.turf.repository.UserRepository;  // Adjust the repository package if needed

@Service
@RequiredArgsConstructor
public class TurfUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Retrieve the user from the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        // Return a TurfUserDetails object to be used by Spring Security
        return TurfUserDetails.build(user);
    }
}
