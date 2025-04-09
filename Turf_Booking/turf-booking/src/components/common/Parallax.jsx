import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Book Your Perfect Turf at <span className="hotel-color">Sports Turf Arena</span>
					</h1>
					<h3>Reserve top-quality turfs for all your sports events.</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax
