import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import Blog from './Blog'


const Blogs = (props) => {


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


  return(
   <>
	<h2>Blogs</h2>
      {props.blogs.map(blog =>
			<Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}
   </>
  )
}


const mapDispatchToProps = {
  addLike, removeBlog
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}  
}


const ConnectedBlogs = connect(mapStateToProps,  mapDispatchToProps)(Blogs)
export default ConnectedBlogs