package com.example.turf.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Example roles: "ADMIN", "CUSTOMER", "TURF_MANAGER"

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users = new HashSet<>();

    // Default constructor
    public Role(String name) {
        this.name = name;
    }

    // Method to assign a role to a user
    public void assignRoleToUser(User user) {
        user.getRoles().add(this);
        this.getUsers().add(user);
    }

    // Method to remove a user from this role
    public void removeUserFromRole(User user) {
        user.getRoles().remove(this);
        this.getUsers().remove(user);
    }

    // Remove all users from this role
    public void removeAllUsersFromRole() {
        if (this.getUsers() != null) {
            List<User> roleUsers = this.getUsers().stream().toList();
            roleUsers.forEach(this::removeUserFromRole);
        }
    }

    // Override to return a default empty string if role name is null
    public String getName() {
        return name != null ? name : "";
    }
}
