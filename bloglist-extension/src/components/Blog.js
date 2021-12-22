import React  from 'react'
import { useNavigate   } from "react-router-dom";
import Comments from './Comments'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Blog = ({blog, likeBlog, deleteBlog, addComment}) => {
	const navigate = useNavigate()
	
	if(!blog){
		return null
	}	

	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')	


	let isAuthor

	if(!loggedUserJSON){
		isAuthor = () => false
	}else{
		isAuthor = () => blog.user.name === JSON.parse(loggedUserJSON).name ? true: false
	}

	


	const handleClick = () => {	
		likeBlog(blog.likes + 1, blog.id)
	} 

	const removeBlog = () => {
		const confirm = window.confirm(`Are you sure to delete blog ${blog.title}`)
		confirm && deleteBlog(blog.id)		
		navigate('/')
	}

	



	return (
	<Stack sx={{ p: 4 }} spacing={2} direction="column"  > 
			<h2> 
				<span> {blog.title} </span>
				<span> {blog.author} </span>
		
			</h2>
	
			<Stack sx={{ pl: 4 }} spacing={2} direction="column"  > 
				<p> {blog.url} </p>
				<Stack  spacing={2} direction="row"  >  <span> likes: </span> {blog.likes}  <Button   style={{ background: '#000', width: '20px' }}  variant="contained" onClick={handleClick} >like</Button> </Stack>
				<p> {blog.user.name} </p>
				{isAuthor() && 
					<p><button onClick={removeBlog} > remove </button> </p>
				}
				<Comments  comments = {blog.comments} id={blog.id} addComment = {addComment} />
				
			</Stack>
	</Stack>  
	)
}

export default Blog