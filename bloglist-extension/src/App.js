import React, {  useEffect } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Notification from "./components/Notification.js";
import LoginForm from "./components/LoginForm.js";
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link    } from "react-router-dom";

const App = () => {	



	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(getLoggedUser())
	}, [])		

	const padding = {
		paddingRight: 5
	}

	const user = useSelector(state => state.user)



	return (
	<div>
		<Notification />	
		<h2>blogs</h2>
		<Link style={padding} to="/users">users</Link>	
		<Link style={padding} to="/blogs">blogs</Link>	
		<Link style={padding} to="/login">{ user ? "logout" : "login"}</Link>	
		<Link style={padding} to="/">home</Link>	

		{user &&  
			<div>
				<p>  {user.name} logged in   </p>					
			</div>
		}			
	
		<Routes>			
			<Route path="/users/*" element={<Users/>}  />	
			<Route path="/login" element={<LoginForm/>}  />	
			<Route path="/blogs/*" element={<Blogs/>}  />	
			<Route path="/" element={<div>HOME</div>}  />
		
		</Routes>
		
	</div>
	)
}

export default App