import React, { useContext } from "react"
import MainHeader from "../layout/MainHeader"
import TurfService from "../common/TurfService" 
import Parallax from "../common/Parallax"
import TurfCarousel from "../common/TurfCarousel" 
import TurfSearch from "../common/TurfSearch" 
import { useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const Home = () => {
	const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")

	return (
		<section>
			
			{message && <p className="text-warning px-5">{message}</p>}
			
			{currentUser && (
				<h6 className="text-success text-center">
					You are logged in as {currentUser}
				</h6>
			)}
			
			
			<MainHeader />
			<div className="container">
				
				<TurfSearch />
				<TurfCarousel />
				<Parallax />
				<TurfCarousel />
				<TurfService />
				<Parallax />
				<TurfCarousel />
			</div>
		</section>
	)
}

export default Home
