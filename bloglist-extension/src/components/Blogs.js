import React, { useRef } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { removeBlog, addLike, commentBlog } from '../reducers/blogReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import Togglable from "../components/Togglable.js";
import BlogForm from "../components/BlogForm.js";
import { Routes, Route, Link, useMatch   } from "react-router-dom";
import Stack from '@mui/material/Stack';


const Blogs = (props) => {


	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)

	const likeBlog =  (likes, id) => {		
		
		props.addLike(  likes , id)

		if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
		}

		dispatch(showNotification( {
			content:  "BLOG LIKED!",
			timeout: setTimeout(() => {
					dispatch(hideNotification())
			}, 3000)
		} ))
		

	}   

	const addComment =  (comment, id) => {		
		
		props.commentBlog(  comment , id)

		if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
		}

		dispatch(showNotification( {
			content:  "COMMENT ADDED!",
			timeout: setTimeout(() => {
					dispatch(hideNotification())
			}, 3000)
		} ))
		

	}   

	
	const deleteBlog =  (id) => {		
		
		props.removeBlog(id)

		if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
		}

		dispatch(showNotification( {
			content:  "BLOG DELETED!",
			timeout: setTimeout(() => {
					dispatch(hideNotification())
			}, 3000)
		} ))
		

	} 

	const user = useSelector(state => state.user)

	const match = useMatch('/blogs/:id')
	const blog = match 
		? props.blogs.find(blog => blog.id === match.params.id)
		: null

  return(
   <>

		<Routes>		
			<Route path="/:id" element={<Blog addComment={addComment}	blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}   />} />
			<Route path="/" element={
				<BlogsHome	blogs={props.blogs}   user={user} blogFormRef={blogFormRef} />} />
		</Routes>		
   </>
  )
}

const BlogsHome = ({ blogs, user, blogFormRef }) => {
	return (
		<Stack sx={{ p: 5 }} spacing={2} direction="column">
				<h2>BLOGS</h2>
				{user &&  
					<div>		
						{<Togglable buttonLabel="Create" ref={blogFormRef} >
							<BlogForm	/>
						</Togglable>}			
					</div>
				}

				{blogs.map(blog => 
					<li  key={blog.id} >
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</li>  
				)}
		</Stack>
	)
	
}

const mapDispatchToProps = {
  addLike, removeBlog, commentBlog
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}  
}


const ConnectedBlogs = connect(mapStateToProps,  mapDispatchToProps)(Blogs)
export default ConnectedBlogs