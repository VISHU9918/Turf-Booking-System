import React, { useState } from "react"

const TurfFilter = ({ data, setFilteredData }) => {
	const [locationFilter, setLocationFilter] = useState("")
	const [priceFilter, setPriceFilter] = useState("")

	// Handles changes in location filter
	const handleLocationChange = (e) => {
		const selectedLocation = e.target.value
		setLocationFilter(selectedLocation)
		filterTurf(selectedLocation, priceFilter)
	}

	// Handles changes in price filter
	const handlePriceChange = (e) => {
		const selectedPrice = e.target.value
		setPriceFilter(selectedPrice)
		filterTurf(locationFilter, selectedPrice)
	}

	// Filters turfs based on location and price
	const filterTurf = (location, price) => {
		const filteredTurfs = data.filter((turf) => {
			const matchesLocation = location ? turf.location.toLowerCase().includes(location.toLowerCase()) : true
			const matchesPrice = price ? turf.price <= parseInt(price) : true
			return matchesLocation && matchesPrice
		})
		setFilteredData(filteredTurfs)
	}

	// Clears both filters
	const clearFilters = () => {
		setLocationFilter("")
		setPriceFilter("")
		setFilteredData(data)
	}

	// Generate a unique list of locations
	const locations = ["", ...new Set(data.map((turf) => turf.location))]

	// Price filter options
	const priceOptions = ["", "50", "100", "150", "200"]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="turf-filter">
				Filter turfs
			</span>
			<div className="d-flex">
				{/* Location filter */}
				<select
					className="form-select mx-2"
					aria-label="location filter"
					value={locationFilter}
					onChange={handleLocationChange}>
					<option value="">Select a location</option>
					{locations.map((location, index) => (
						<option key={index} value={String(location)}>
							{String(location)}
						</option>
					))}
				</select>

				
				<select
					className="form-select mx-2"
					aria-label="price filter"
					value={priceFilter}
					onChange={handlePriceChange}>
					<option value="">Select max price</option>
					{priceOptions.map((price, index) => (
						<option key={index} value={String(price)}>
							Up to ${price}
						</option>
					))}
				</select>

				
				<button className="btn btn-secondary" type="button" onClick={clearFilters}>
					Clear Filter
				</button>
			</div>
		</div>
	)
}

export default TurfFilter
