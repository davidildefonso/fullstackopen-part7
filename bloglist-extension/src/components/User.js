import React from 'react'
import Stack from '@mui/material/Stack';

const User = ({user}) => {

	return (
		<Stack sx={{ p: 4 }} spacing={2} direction="column">
			<h2>{user.name} </h2>
			<p>List of blogs</p>
			<Stack sx={{ pl: 4 }} spacing={2} direction="column">
				{user.blogs.map(blog => 
					<div key= {blog.id} >  {blog.title}  </div>
				)}
			</Stack>
		</Stack>
	)
}

export default User