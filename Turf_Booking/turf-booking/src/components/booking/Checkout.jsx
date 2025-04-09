import React, { useEffect, useState } from "react"
import BookingForm from "../booking/BookingForm" 
import {
	FaUtensils,
	FaWifi,
	FaCar,
	FaTshirt
} from "react-icons/fa"

import { useParams } from "react-router-dom"
import { getTurfById } from "../utils/ApiFunctions" 
import TurfCarousel from "../common/TurfCarousel" 

const Checkout = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [turfInfo, setTurfInfo] = useState({
		photo: "",
		turfLocation: "",
		pricePerHour: ""
	})

	const { turfId } = useParams() 

	useEffect(() => {
		setTimeout(() => {
			getTurfById(turfId) 
				.then((response) => {
					setTurfInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [turfId])

	return (
		<div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading turf information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="turf-info">
								<img
									src={`data:image/png;base64,${turfInfo.photo}`}
									alt="Turf photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Turf Location:</th>
											<td>{turfInfo.turfLocation}</td>
										</tr>
										<tr>
											<th>Price per Hour:</th>
											<td>${turfInfo.pricePerHour}</td>
										</tr>
										<tr>
											<th>Services:</th>
											<td>
												<ul className="list-unstyled">
													<li>
														<FaWifi /> Wifi
													</li>
													<li>
														<FaUtensils /> Refreshments
													</li>
													<li>
														<FaCar /> Car Service
													</li>
													<li>
														<FaTshirt /> Cleaning/Laundry
													</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<BookingForm /> 
					</div>
				</div>
			</section>
			<div className="container">
				<TurfCarousel /> 
			</div>
		</div>
	)
}

export default Checkout
