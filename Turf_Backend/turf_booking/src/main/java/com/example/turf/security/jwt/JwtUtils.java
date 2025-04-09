package com.example.turf.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.example.turf.security.user.TurfUserDetails;  

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.token.jwtSecret}")
    private String jwtSecret; // Secret key for signing the JWT

    @Value("${auth.token.expirationInMils}")
    private int jwtExpirationMs; // Expiration time in milliseconds

    /**
     * Generate a JWT token for a user
     */
    public String generateJwtTokenForUser(Authentication authentication) {
        TurfUserDetails userPrincipal = (TurfUserDetails) authentication.getPrincipal();  // Custom user details for TurfBookingSystem
        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)  // Map authorities to roles
                .toList();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())  // Set the subject as the username (email)
                .claim("roles", roles)  // Add roles as a custom claim
                .setIssuedAt(new Date())  // Set the current date and time as the issued time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))  // Set expiration time
                .signWith(key(), SignatureAlgorithm.HS256)  // Sign with the key using HS256 algorithm
                .compact();
    }

    /**
     * Retrieve the key used for signing and verifying JWT
     */
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));  // Decode the secret key from Base64
    }

    /**
     * Get the username from the JWT token
     */
    public String getUserNameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())  // Use the signing key to parse the JWT
                .build()
                .parseClaimsJws(token)  // Parse the claims from the token
                .getBody()
                .getSubject();  // Return the subject (username/email)
    }

    /**
     * Validate the JWT token
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);  // Try parsing the token
            return true;  // If no exceptions are thrown, the token is valid
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());  // Log invalid JWT token error
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token: {}", e.getMessage());  // Log expired token error
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", e.getMessage());  // Log unsupported JWT token error
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());  // Log invalid JWT claims
        }
        return false;  // Return false if the token is invalid
    }
}
