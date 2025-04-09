import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:8080"  
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* This function adds a new turf to the database */
export async function addTurf(photo, turfLocation, turfPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("turfLocation", turfLocation)
	formData.append("turfPrice", turfPrice)

	const response = await api.post("/turfs/add/new-turf", formData)
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function gets all turf types from the database */
export async function getTurfLocations() {
	try {
		const response = await api.get("/turfs/turf/locations")
		return response.data
	} catch (error) {
		throw new Error("Error fetching turf locations",error)
	}
}

/* This function gets all turfs from the database */
export async function getAllTurfs() {
	try {
		const result = await api.get("/turfs/all-turfs")
		return result.data
	} catch (error) {
		throw new Error("Error fetching turfs")
	}
}

/* This function deletes a turf by its Id */
export async function deleteTurf(turfId) {
	try {
		const result = await api.delete("/turfs/delete/turf/${turfId}")
		return result.data
	} catch (error) {
		throw new Error(`Error deleting turf: ${error.message}`)
	}
}

/* This function updates a turf */
export async function updateTurf(turfId, turfData) {
	const formData = new FormData()
	formData.append("turfLocation", turfData.turfLocation)
	formData.append("turfPrice", turfData.turfPrice)
	formData.append("photo", turfData.photo)
	const response = await api.put(`/turfs/update/${turfId}`, formData)
	return response
}

/* This function gets a turf by its Id */
export async function getTurfById(turfId) {
	try {
		const result = await api.get(`/turfs/turf/${turfId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching turf: ${error.message}`)
	}
}

/* This function saves a new booking to the database */
export async function bookTurf(turfId, booking) {
	try {
		const response = await api.post(`/bookings/turf/${turfId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking turf: ${error.message}`)
		}
	}
}

/* This function gets all bookings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings")
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings: ${error.message}`)
	}
}

/* This function gets a booking by its confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error finding booking: ${error.message}`)
		}
	}
}

/* This function cancels a booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking: ${error.message}`)
	}
}

/* This function gets all available turfs from the database with a given date and turf type */
export async function getAvailableTurfs(checkInDate, checkOutDate, turfLocation) {
	const result = await api.get(
		`/turfs/available-turfs?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&turfType=${turfLocation}`
	)
	return result
}

/* This function registers a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error: ${error.message}`)
		}
	}
}

/* This function logs in a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/* This is the function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by user id */
export async function getBookingsByUserEmail(email, token) {
	try {
		const response = await api.get(`/bookings/user/${email}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}


