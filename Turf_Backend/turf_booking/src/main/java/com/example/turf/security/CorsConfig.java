package com.example.turf.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@Configuration
@EnableWebMvc
public class CorsConfig {

    private static final Long MAX_AGE = 3600L;  // Max age for preflight requests
    private static final int CORS_FILTER_ORDER = -102;  // Set the order for the filter to ensure proper execution

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
        // Initialize Cors Configuration Source
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        // Define CORS Configuration
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);  // Allow credentials to be included in cross-origin requests
        config.addAllowedOrigin("http://localhost:3000");  // Allowing frontend (assumed development URL)

        
        // Define allowed headers
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,  // Allow Authorization header for JWT
                HttpHeaders.CONTENT_TYPE,   // Allow content type headers
                HttpHeaders.ACCEPT));       // Allow Accept header

        // Define allowed HTTP methods
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),    // Allow GET requests
                HttpMethod.POST.name(),   // Allow POST requests (for creating bookings, etc.)
                HttpMethod.PUT.name(),    // Allow PUT requests (for updating bookings)
                HttpMethod.DELETE.name()  // Allow DELETE requests (for canceling bookings)
        ));

        // Set max age for pre-flight request caching
        config.setMaxAge(MAX_AGE);

        // Register the CORS configuration
        source.registerCorsConfiguration("/**", config);

        // Register the CorsFilter bean
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(CORS_FILTER_ORDER);  // Ensure the filter runs in the correct order
        return bean;
    }
}
