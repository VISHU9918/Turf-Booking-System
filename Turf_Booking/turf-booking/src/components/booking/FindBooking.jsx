import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		turf: { id: "", turfLocation: "" },
		turfNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		totalNumOfPlayers: ""
	})

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		turf: { id: "", turfLocation: "" },
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		totalNumOfPlayers: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(data)
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.id)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Find My Turf Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your booking...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="col-md-6 mt-4 mb-5">
						<h3>Turf Booking Information</h3>
						<p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
						<p>Turf Number: {bookingInfo.turf.id}</p>
						<p>Turf Location: {bookingInfo.turf.turfLocation}</p>
						<p>
							Check-in Time:{" "}
							{moment(bookingInfo.checkInDate).format("hh:mm A")}
						</p>
						<p>
							Check-out Time:{" "}
							{moment(bookingInfo.checkOutDate).format("hh:mm A")}
						</p>
						<p>Full Name: {bookingInfo.guestName}</p>
						<p>Email Address: {bookingInfo.guestEmail}</p>
						<p>Total Player: {bookingInfo.totalNumOfPlayers}</p>

						{!isDeleted && (
							<button
								onClick={() => handleBookingCancellation(bookingInfo.id)}
								className="btn btn-danger">
								Cancel Booking
							</button>
						)}
					</div>
				) : (
					<div>Finding booking...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	)
}

export default FindBooking
