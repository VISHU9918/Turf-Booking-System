package com.example.turf.security.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.turf.model.User;  // Assuming your 'User' model is in this package

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TurfUserDetails implements UserDetails {

    private Long id;
    private String email;
    private String password;
    private Collection<GrantedAuthority> authorities;

    public static TurfUserDetails build(User user) {
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new TurfUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // You can implement your own logic for expired accounts if needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Same for locked account
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // You can implement your own logic for expired credentials if needed
    }

    @Override
    public boolean isEnabled() {
        return true;  // You can add your own logic here for whether the user is enabled or not
    }
}
