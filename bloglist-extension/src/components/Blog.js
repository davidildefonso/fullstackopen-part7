import React  from 'react'
import { useNavigate   } from "react-router-dom";

const Blog = ({blog, likeBlog, deleteBlog}) => {
	const navigate = useNavigate()
	if(!blog){
		return null
	}	

	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')	
	
	const isAuthor = () => blog.user.name === JSON.parse(loggedUserJSON).name ? true: false


	const handleClick = () => {	
		likeBlog(blog.likes + 1, blog.id)
	} 

	const removeBlog = () => {
		const confirm = window.confirm(`Are you sure to delete blog ${blog.title}`)
		confirm && deleteBlog(blog.id)		
		navigate('/')
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	console.log(blog, isAuthor())

	return (
	<div style={blogStyle} >
			<h2> 
				<span> {blog.title} </span>
				<span> {blog.author} </span>
		
			</h2>
	
			<div>
				<p> {blog.url} </p>
				<p> likes: {blog.likes}  <button onClick={handleClick} >like</button> </p>
				<p> {blog.user.name} </p>
				{isAuthor() && 
					<p><button onClick={removeBlog} > remove </button> </p>
				}
				
			</div>
	</div>  
	)
}

export default Blog