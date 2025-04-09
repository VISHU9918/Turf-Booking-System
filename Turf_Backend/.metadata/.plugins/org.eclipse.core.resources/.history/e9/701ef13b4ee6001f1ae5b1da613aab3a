package com.example.turf.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class TurfResponse {

    private Long id;
    private String turfType;    // Renamed to reflect the type of turf (e.g., Football, Cricket, etc.)
    private BigDecimal turfPrice;  // Price for booking the turf
    private boolean isBooked;    // Whether the turf is already booked
    private String photo;       // Turf photo (encoded as Base64 if needed)
    private List<BookingResponse> bookings;  // List of bookings for this turf

    // Constructor to initialize TurfResponse with basic details
    public TurfResponse(Long id, String turfType, BigDecimal turfPrice) {
        this.id = id;
        this.turfType = turfType;
        this.turfPrice = turfPrice;
    }

    // Constructor to initialize TurfResponse with full details including booking info and photo
    public TurfResponse(Long id, String turfType, BigDecimal turfPrice, boolean isBooked,
                        byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.turfType = turfType;
        this.turfPrice = turfPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
    }
}
