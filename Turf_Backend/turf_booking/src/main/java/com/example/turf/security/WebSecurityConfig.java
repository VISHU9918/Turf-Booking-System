package com.example.turf.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.turf.security.jwt.AuthTokenFilter;
import com.example.turf.security.jwt.JwtAuthEntryPoint;
import com.example.turf.security.user.TurfUserDetailsService;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig {

    private final TurfUserDetailsService userDetailsService;  // Use TurfUserDetailsService for turf system users
    private final JwtAuthEntryPoint jwtAuthEntryPoint;  // Entry point for authentication errors

    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter();  // Custom JWT filter for authentication
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Using BCrypt for password encoding
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);  // Custom user details service for turf system
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(
                        exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))  // Custom entry point for auth errors
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/turf/**", "/bookings/**")  // Allow access to auth, turf, and bookings routes without login
                        .permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")  // Only admin users can access certain admin routes
                        .anyRequest().authenticated());  // All other requests require authentication

        http.authenticationProvider(authenticationProvider());  // Custom authentication provider
        http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);  // Adding custom JWT filter
        return http.build();
    }
}
