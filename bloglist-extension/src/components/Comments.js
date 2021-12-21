import React from 'react'


const Comments = ({comments, addComment, id}) => {

	const handleClick = (event) => {
		event.preventDefault()
		addComment(event.target.comment.value, id)
	}

	return (
		<div>
			<form onSubmit = {handleClick}>
				<p>Comment:  <input name="comment" type='text' /> <button  type='submit' >Save</button> </p> 
			</form>
		
			{comments && 	
				<ul>
					{comments.map((c, i) => 
						<li key= {Math.random(i) * 999919991 + 1} >  {c}  </li>
					)}
				</ul> }
		
		</div>
	)
}

export default Comments