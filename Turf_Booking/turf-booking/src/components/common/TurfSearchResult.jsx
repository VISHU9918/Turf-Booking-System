import React, { useState } from "react"
import TurfCard from "../turf/TurfCard" 
import { Button, Row, Col, Spinner } from "react-bootstrap"
import TurfPaginator from "./TurfPaginator" // Pagination component

const TurfSearchResult = ({ results, onClearSearch, isLoading }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const resultsPerPage = 3 // Change as necessary
	const totalResults = results.length
	const totalPages = Math.ceil(totalResults / resultsPerPage)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const startIndex = (currentPage - 1) * resultsPerPage
	const endIndex = startIndex + resultsPerPage
	const paginatedResults = results.slice(startIndex, endIndex)

	return (
		<>
			
			{isLoading ? (
				<div className="text-center mt-5">
					<Spinner animation="border" variant="primary" />
					<p>Loading available turfs...</p>
				</div>
			) : results.length > 0 ? (
				<>
					<h5 className="text-center mt-5">Available Turf Search Results</h5>
					<Row>
						{paginatedResults.map((turf) => (
							<Col key={turf.id} md={4} className="mb-4">
								{/* Assuming TurfCard is for displaying individual turf details */}
								<TurfCard turf={turf} />
							</Col>
						))}
					</Row>
					<Row className="mt-3">
						{/* Pagination */}
						{totalResults > resultsPerPage && (
							<TurfPaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						{/* Clear Search Button */}
						<Button variant="secondary" onClick={onClearSearch} className="mt-3">
							Clear Search
						</Button>
					</Row>
				</>
			) : (
				<p className="text-center mt-5">No turfs available based on your search criteria</p>
			)}
		</>
	)
}

export default TurfSearchResult
