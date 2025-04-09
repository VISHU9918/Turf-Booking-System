package com.example.turf.service;

import java.util.List;

import com.example.turf.model.BookedTurf;  // Updated to use BookedTurf instead of BookedRoom

public interface IBookingService {

    // Cancel a booking based on the booking ID
    void cancelBooking(Long bookingId);

    // Get all bookings for a specific turf by its ID
    List<BookedTurf> getAllBookingsByTurfId(Long turfId);  // Changed to turfId

    // Save a new booking for a turf
    String saveBooking(Long turfId, BookedTurf bookingRequest);  // Changed to turfId and BookedTurf

    // Find a booking by its confirmation code
    BookedTurf findByBookingConfirmationCode(String confirmationCode);

    // Get all bookings
    List<BookedTurf> getAllBookings();

    // Get all bookings by a user's email
    List<BookedTurf> getBookingsByUserEmail(String email);  // Updated to BookedTurf
}
