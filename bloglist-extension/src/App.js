import React, {  useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from "./components/Notification.js";
import Togglable from "./components/Togglable.js";
import LoginForm from "./components/LoginForm.js";
import BlogForm from "./components/BlogForm.js";
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {	

	const blogFormRef = useRef()

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(getLoggedUser())
	}, [])	

	const user = useSelector(state => state.user)

	return (
	<div>
		<h2>blogs</h2>
		<Notification />			
		<LoginForm	/>
	
		{user &&  
			<div>
				<p>  {user.name} logged in   </p>
				{<Togglable buttonLabel="Create" ref={blogFormRef} >
					<BlogForm	/>
				</Togglable>}
				<Blogs/>
			</div>
		}
		
	</div>
	)
}

export default App