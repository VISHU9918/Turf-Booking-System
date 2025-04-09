package com.example.turf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.turf.model.BookedTurf;  
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookedTurf, Long> {

    
    List<BookedTurf> findByTurfId(Long turfId);

    // Find a booking by its confirmation code
    Optional<BookedTurf> findByBookingConfirmationCode(String confirmationCode);

    // Find all bookings by guest's email
    List<BookedTurf> findByGuestEmail(String email);
}
