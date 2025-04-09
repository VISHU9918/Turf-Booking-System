package com.example.turf.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.turf.exception.RoleAlreadyExistException;
import com.example.turf.exception.UserAlreadyExistsException;
import com.example.turf.model.Role;
import com.example.turf.model.User;
import com.example.turf.repository.RoleRepository;
import com.example.turf.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    // Fetch all roles from the repository
    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    // Create a new role for users
    @Override
    public Role createRole(Role theRole) {
        // Prefix the role name with "ROLE_" and ensure it's in uppercase for consistency
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        
        // Check if the role already exists
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(theRole.getName() + " role already exists");
        }
        
        // Save and return the newly created role
        Role role = new Role(roleName);
        return roleRepository.save(role);
    }

    // Delete a role by its ID
    @Override
    public void deleteRole(Long roleId) {
        // First, remove all users from the role
        this.removeAllUsersFromRole(roleId);
        
        // Delete the role from the repository
        roleRepository.deleteById(roleId);
    }

    // Find a role by its name
    @Override
    public Role findByName(String name) {
        // Use Optional to handle possible null value
        return roleRepository.findByName(name)
                .orElseThrow();
    }

    // Remove a user from a specific role
    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        // If the user and role exist, remove the user from the role
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        
        // If user or role does not exist, throw an exception
        throw new UsernameNotFoundException("User not found or not associated with this role");
    }

    // Assign a specific role to a user
    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        // Check if the user is already assigned the role
        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistsException(
                    user.get().getFirstName() + " is already assigned to the " + role.get().getName() + " role");
        }

        // If both user and role exist, assign the role to the user
        if (role.isPresent() && user.isPresent()) {
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        
        return user.get();
    }

    // Remove all users from a specific role
    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        
        // If the role exists, remove all users from it
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepository.save(role.get());
    }
}
