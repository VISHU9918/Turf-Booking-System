package com.example.turf.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {

    private Long id;           // User's unique identifier
    private String email;      // User's email address
    private String token;      // The JWT token for the session
    private String type = "Bearer";  // Default type for JWT tokens
    private List<String> roles;      // List of roles (e.g., "Customer", "Admin", "TurfOwner")

    // Constructor to initialize the JwtResponse with user information
    public JwtResponse(Long id, String email, String token, List<String> roles) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}
