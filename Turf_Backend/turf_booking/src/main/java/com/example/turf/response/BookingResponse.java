package com.example.turf.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private Long id;

    private LocalDate startDate;  // renamed from checkInDate to startDate for Turf booking

    private LocalDate endDate;    // renamed from checkOutDate to endDate for Turf booking

    private String guestName;

    private String guestEmail;

    private int totalPlayers;     // renamed from numOfAdults + numOfChildren to totalPlayers

    private String bookingConfirmationCode;

    private TurfResponse turf;    // Referencing TurfResponse instead of RoomResponse

    // Constructor with basic fields, mainly for simplicity
    public BookingResponse(Long id, LocalDate startDate, LocalDate endDate, String bookingConfirmationCode) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
