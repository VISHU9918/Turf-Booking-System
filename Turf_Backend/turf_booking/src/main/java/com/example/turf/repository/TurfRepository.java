package com.example.turf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.turf.model.Turf;  
import com.example.turf.model.BookedTurf;  

import java.time.LocalDate;
import java.util.List;

public interface TurfRepository extends JpaRepository<Turf, Long> {

    // Fetch distinct turf types
    @Query("SELECT DISTINCT t.turfType FROM Turf t")
    List<String> findDistinctTurfLocations();

    // Fetch available turfs by type and dates
    @Query("SELECT t FROM Turf t " +
            " WHERE t.turfType LIKE %:turfType% " +
            " AND t.id NOT IN (" +
            "  SELECT bt.turf.id FROM BookedTurf bt " +
            "  WHERE ((bt.checkInDate <= :checkOutDate) AND (bt.checkOutDate >= :checkInDate))" +
            ")")

	List<Turf> findAvailableTurfsByDatesAndLocation(LocalDate checkInDate, LocalDate checkOutDate, String turfLocation);
}
