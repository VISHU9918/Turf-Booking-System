import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableTurfs } from "../utils/ApiFunctions" 
import TurfSearchResult from "./TurfSearchResult" 
import TurfTypeSelector from "./TurfTypeSelector" 

const TurfSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		checkInDate: "",
		checkOutDate: "",
		turfLocation: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [availableTurfs, setAvailableTurfs] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = (e) => {
		e.preventDefault()
		const checkInMoment = moment(searchQuery.checkInDate)
		const checkOutMoment = moment(searchQuery.checkOutDate)

		// Validate check-in and check-out dates
		if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
			setErrorMessage("Please enter valid dates")
			return
		}
		if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
			setErrorMessage("Check-out date must be after check-in date")
			return
		}

		setIsLoading(true)
		// Call API to get available turfs for the given dates and turf location
		getAvailableTurfs(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.turfLocation)
			.then((response) => {
				setAvailableTurfs(response.data)
				setTimeout(() => setIsLoading(false), 2000)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery({ ...searchQuery, [name]: value })
		const checkInDate = moment(searchQuery.checkInDate)
		const checkOutDate = moment(searchQuery.checkOutDate)
		if (checkInDate.isValid() && checkOutDate.isValid()) {
			setErrorMessage("")
		}
	}

	const handleClearSearch = () => {
		setSearchQuery({
			checkInDate: "",
			checkOutDate: "",
			turfLocation: ""
		})
		setAvailableTurfs([])
	}

	return (
		<>
			<Container className="shadow mt-n5 mb-5 py-5">
				<Form onSubmit={handleSearch}>
					<Row className="justify-content-center">
						<Col xs={12} md={3}>
							<Form.Group controlId="checkInDate">
								<Form.Label>Check-in Date</Form.Label>
								<Form.Control
									type="date"
									name="checkInDate"
									value={searchQuery.checkInDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="checkOutDate">
								<Form.Label>Check-out Date</Form.Label>
								<Form.Control
									type="date"
									name="checkOutDate"
									value={searchQuery.checkOutDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="turfLocation">
								<Form.Label>Turf Location</Form.Label>
								<div className="d-flex">
									<TurfTypeSelector
										handleTurfInputChange={handleInputChange}
										newTurf={searchQuery}
									/>
									<Button variant="secondary" type="submit" className="ml-2">
										Search
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				{isLoading ? (
					<p className="mt-4">Finding available turfs...</p>
				) : availableTurfs.length > 0 ? (
					<TurfSearchResult results={availableTurfs} onClearSearch={handleClearSearch} />
				) : (
					<p className="mt-4">No turfs available for the selected dates and this turf location.</p>
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
			</Container>
		</>
	)
}

export default TurfSearch
