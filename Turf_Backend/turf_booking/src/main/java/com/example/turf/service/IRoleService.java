package com.example.turf.service;

import java.util.List;

import com.example.turf.model.Role;   // Updated to use Role from Turf system
import com.example.turf.model.User;   // Updated to use User from Turf system

public interface IRoleService {

    // Get all roles
    List<Role> getRoles();

    // Create a new role
    Role createRole(Role theRole);

    // Delete a role by its ID
    void deleteRole(Long id);

    // Find a role by its name
    Role findByName(String name);

    // Remove a user from a specific role
    User removeUserFromRole(Long userId, Long roleId);

    // Assign a role to a user
    User assignRoleToUser(Long userId, Long roleId);

    // Remove all users from a specific role
    Role removeAllUsersFromRole(Long roleId);
}
