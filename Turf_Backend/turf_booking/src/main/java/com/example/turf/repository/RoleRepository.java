package com.example.turf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.turf.model.Role;  

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String role);

    boolean existsByName(String role);
}
