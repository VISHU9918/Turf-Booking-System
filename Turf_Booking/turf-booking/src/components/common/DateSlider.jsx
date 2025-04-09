import React, { useState } from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"

const DateSlider = ({ locations, onDateChange, onFilterChange }) => {
	// State for date range and location
	const [dateRange, setDateRange] = useState({
		startDate: undefined,
		endDate: undefined,
		key: "selection"
	})
	const [selectedLocation, setSelectedLocation] = useState("")

	// Handle location change
	const handleLocationChange = (event) => {
		setSelectedLocation(event.target.value)
		onFilterChange(event.target.value, dateRange.startDate, dateRange.endDate)
	}

	// Handle date range selection
	const handleSelect = (ranges) => {
		setDateRange(ranges.selection)
		// Update both date and location filter
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(selectedLocation, ranges.selection.startDate, ranges.selection.endDate)
	}

	// Handle clearing all filters
	const handleClearFilter = () => {
		setDateRange({
			startDate: undefined,
			endDate: undefined,
			key: "selection"
		})
		setSelectedLocation("")
		onDateChange(null, null)
		onFilterChange(null, null, null)
	}

	return (
		<>
			<h5>Filter Turf Reservations</h5>
			
			{/* Location Filter */}
			<div className="mb-4">
				<label htmlFor="location">Select Location</label>
				<select
					id="location"
					className="form-control"
					value={selectedLocation}
					onChange={handleLocationChange}
				>
					<option value="">-- Choose a Location --</option>
					{locations.map((location, index) => (
						<option key={index} value={location}>
							{location}
						</option>
					))}
				</select>
			</div>
			
			
			<DateRangePicker
				ranges={[dateRange]}
				onChange={handleSelect}
				className="mb-4"
			/>

			
			<button className="btn btn-secondary" onClick={handleClearFilter}>
				Clear Filters
			</button>
		</>
	)
}

export default DateSlider
