import React, { useState } from "react"
import { addTurf } from "../utils/ApiFunctions" 
import TurfTypeSelector from "../common/TurfTypeSelector"  
import { Link } from "react-router-dom"

const AddTurf = () => {
	const [newTurf, setNewTurf] = useState({	
		photo: null,
		turfLocation: "",
		turfPrice: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleTurfInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "turfPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewTurf({ ...newTurf, [name]: value })
	}

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewTurf({ ...newTurf, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addTurf(newTurf.photo, newTurf.turfLocation, newTurf.turfPrice)
			if (success !== undefined) {
				setSuccessMessage("A new turf was added successfully!")
				setNewTurf({ photo: null, turfLocation: "", turfPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new turf")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Turf</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="turfLocation" className="form-label">
									Turf Location
								</label>
								<div>
									<TurfTypeSelector
										handleTurfInputChange={handleTurfInputChange}
										newTurf={newTurf}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="turfPrice" className="form-label">
									Turf Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="turfPrice"
									name="turfPrice"
									value={newTurf.turfPrice}
									onChange={handleTurfInputChange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Turf Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview turf photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-turfs"} className="btn btn-outline-info">
									Existing Turfs
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Turf
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddTurf
