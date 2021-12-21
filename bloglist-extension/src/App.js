import React, {  useEffect } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import NavBar from './components/ui-components/NavBar'
import Notification from "./components/Notification.js";
import LoginForm from "./components/LoginForm.js";
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link    } from "react-router-dom";
import Container from '@material-ui/core/Container'

const App = () => {	



	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(getLoggedUser())
	}, [])		

	

	const user = useSelector(state => state.user)




	return (
	<Container maxWidth={false}  disableGutters={true}  >
		<Notification />		
		<NavBar logo="BLOGS" >
			<Link className='navbar-link'  to="/">home</Link>
			<Link className='navbar-link' to="/blogs">blogs</Link>	
			<Link  className='navbar-link' to="/users">users</Link>		
			<Link  className='navbar-link' to="/login">{ user ? "logout" : "login"}</Link>
		</NavBar>		


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
		
	</Container>
	)
}

export default App