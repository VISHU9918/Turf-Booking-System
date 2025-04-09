import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const bookingDate = moment(booking.bookingDate) // Adjusted for turf booking
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title hotel-color">Turf Reservation Summary</h4>
                <p>
                    Name: <strong>{booking.guestFullName}</strong>
                </p>
                <p>
                    Email: <strong>{booking.guestEmail}</strong>
                </p>
                <p>
                    Booking Date: <strong>{bookingDate.format("MMM Do YYYY")}</strong>
                </p>

                <div>
                    <h5 className="turf-color">Number of Players</h5>
                    <strong>
                        Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
                    </strong>
                    
                </div>

                <div>
                    <h5 className="turf-color">Turf Location</h5>
                    <strong>{booking.turf.turfLocation}</strong> 
                </div>

                {payment > 0 ? (
                    <>
                        <p>
                            Total payment: <strong>${payment}</strong>
                        </p>

                        {isFormValid && !isBookingConfirmed ? (
                            <Button variant="success" onClick={handleConfirmBooking}>
                                {isProcessingPayment ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"></span>
                                        Booking Confirmed, redirecting to payment...
                                    </>
                                ) : (
                                    "Confirm Booking & proceed to payment"
                                )}
                            </Button>
                        ) : isBookingConfirmed ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-danger">Booking date is required.</p>
                )}
            </div>
        </div>
    )
}

export default BookingSummary
