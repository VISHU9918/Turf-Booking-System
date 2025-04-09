package com.example.turf.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.turf.exception.RoleAlreadyExistException;
import com.example.turf.exception.RoleAlreadyExistException;
import com.example.turf.model.Role;
import com.example.turf.model.User;
import com.example.turf.service.IRoleService;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final IRoleService roleService;

    // Get all roles (accessible by authorized users)
    @GetMapping("/all-roles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    // Create a new role
    @PostMapping("/create-new-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New role created successfully!");
        } catch (RoleAlreadyExistException re) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());
        }
    }

    // Delete a specific role by ID
    @DeleteMapping("/delete/{roleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
    }

    // Remove all users from a specific role
    @PostMapping("/remove-all-users-from-role/{roleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    // Remove a specific user from a role
    @PostMapping("/remove-user-from-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    // Assign a specific user to a role
    @PostMapping("/assign-user-to-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}
