import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaFutbol,
	FaParking,
	FaTools,
	FaTshirt,
	FaWifi
} from "react-icons/fa"

const TurfService = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Our Turf Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
						Services at <span className="turf-color">Sports Turf - </span>Booking
						<span className="gap-2">
							<FaClock className="ml-5" /> 24-Hour Availability
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaFutbol /> Turf Booking
								</Card.Title>
								<Card.Text>Book a turf field for your game or event with ease.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaTools /> Turf Maintenance
								</Card.Title>
								<Card.Text>We offer regular maintenance to ensure a high-quality playing surface.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaTshirt /> Equipment Rental
								</Card.Title>
								<Card.Text>Rent sports equipment like balls, nets, and more for your game.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaWifi /> WiFi Access
								</Card.Title>
								<Card.Text>Stay connected with our free Wi-Fi service available at the turf venue.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaParking /> Parking
								</Card.Title>
								<Card.Text>Convenient on-site parking for players and guests.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="turf-color">
									<FaClock /> 24/7 Customer Support
								</Card.Title>
								<Card.Text>Contact us anytime for assistance with booking or other services.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default TurfService
