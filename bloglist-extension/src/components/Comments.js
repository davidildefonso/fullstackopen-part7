import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Comments = ({comments, addComment, id}) => {

	const handleClick = (event) => {
		event.preventDefault()
		addComment(event.target.comment.value, id)
	}

	return (
		<Stack spacing={2} direction="column"  > 
			<form onSubmit = {handleClick}>
				<Stack  spacing={2} direction="row"  > Comment:  <input name="comment" type='text' /> 
					<Button  type='submit' style={{ background: '#000', width: '20px' }}  variant="contained"  >Save</Button> </Stack> 
			</form>
		
			{comments && 	
				<div>
					{comments.map((c, i) => 
					
						<Stack sx={{ pl: 8,  pb:2 }} spacing={2} direction="column" key= {Math.random(i) * 999919991 + 1} > 
							{c}
						</Stack> 
						
					)}
				</div> }
		
		</Stack>
	)
}

export default Comments