import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingTurfs from "./components/turf/ExistingTurfs"  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditTurf from "./components/turf/EditTurf"  
import AddTurf from "./components/turf/AddTurf"  
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import TurfListing from "./components/turf/TurfListing"  
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import Contact from "./components/layout/Contact"
import AboutUs from "./components/layout/AboutUs"

function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						
						<Route path="/" element={<Home />} />
						
						
						<Route path="/edit-turf/:turfId" element={<EditTurf />} /> 
						<Route path="/existing-turfs" element={<ExistingTurfs />} />  
						<Route path="/add-turf" element={<AddTurf />} /> 
						
						<Route
							path="/book-turf/:turfId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>
						<Route path="/browse-all-turfs" element={<TurfListing />} />  {/* Browse All Turfs */}

						
						<Route path="/admin" element={<Admin />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/contact" element={<Contact />} />

						
						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />

						
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
						
						{/* User profile */}
						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<FindBooking />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App
