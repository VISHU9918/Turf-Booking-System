import React, { useEffect, useState } from "react"
import { getTurfById, updateTurf } from "../utils/ApiFunctions"  
import { Link, useParams } from "react-router-dom"

const EditTurf = () => {
	const [turf, setTurf] = useState({
		photo: "",
		turfLocation: "",
		turfPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { turfId } = useParams() 

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setTurf({ ...turf, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setTurf({ ...turf, [name]: value })
	}

	useEffect(() => {
		const fetchTurf = async () => {
			try {
				const turfData = await getTurfById(turfId)
				setTurf(turfData)
				setImagePreview(turfData.photo)
			} catch (error) {
				console.error(error)
			}
		}

		fetchTurf()
	}, [turfId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateTurf(turfId, turf)
			if (response.status === 200) {
				setSuccessMessage("Turf updated successfully!")
				const updatedTurfData = await getTurfById(turfId)
				setTurf(updatedTurfData)
				setImagePreview(updatedTurfData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating turf")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Turf</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="turfLocation" className="form-label">
								Turf Location
							</label>
							<input
								type="text"
								className="form-control"
								id="turfType"
								name="turfType"
								value={turf.turfLocation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="turfPrice" className="form-label">
								Turf Price
							</label>
							<input
								type="number"
								className="form-control"
								id="turfPrice"
								name="turfPrice"
								value={turf.turfPrice}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label">
								Turf Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Turf preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-turfs"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Turf
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditTurf
