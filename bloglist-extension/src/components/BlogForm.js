import React from 'react'
import { connect, useDispatch, useSelector  } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog}) => {
	const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)

	const addBlog = (event) => {

		event.preventDefault()

		createBlog({
			title: event.target.title.value,
			author:  event.target.author.value,
			url:  event.target.url.value
		});

		event.target.title.value = ''
		event.target.author.value = ''
		event.target.url.value = ''

		if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
		}

		dispatch(showNotification( {
		content:  "BLOG CREATED!",
		timeout: setTimeout(() => {
				dispatch(hideNotification())
		}, 3000)
	} ))

	}

	const blogFormStyle = {
		marginTop: 10,
		marginBottom: 10
	}

	return (
	<div style={blogFormStyle} >
		<h2>Create a new blog</h2>

		<form className="form"  onSubmit={addBlog}>
			<h3>Create New</h3>
			<p>Title: <input className="title" id="title" name='title' /> </p>
			<p>Author: <input className="author"  id="author" name='author'  /> </p>
			<p>Url: <input className="url"  id="url" name='url'  /> </p>			
			<button type="submit" id="create-blog-button">Create</button>
		</form>
	</div>
	)
}

const mapDispatchToProps = dispatch => {
  return {
    createBlog: value => {
      dispatch(createBlog(value))
    },
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(BlogForm)