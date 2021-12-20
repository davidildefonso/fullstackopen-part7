
import blogService from '../services/blogs'

export const addLike = ( likes,id) => { 
    return async dispatch => {
		const updatedBlog = await blogService.update( { likes }, id)
		dispatch({
			type: 'LIKE',
			data: updatedBlog,
		})
	}
}

export const removeBlog = ( id) => { 
    return async dispatch => {
		await blogService.remove( id)
		dispatch({
			type: 'DELETE',
			data: id,
		})
	}
}


export const createBlog = (data) => {
   return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }

}



export const initializeBlogs = () => {
   return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: anecdotes,
    })
  }


}



const reducer = (state = [], action) => {
	switch(action.type) {
		case 'NEW_BLOG':
			return state.concat(action.data).sort((blog1, blog2) => blog2.likes - blog1.likes)

		case 'LIKE': {
			const id = action.data.id			
			return state.map(blog =>
				blog.id === id ? action.data : blog
			).sort((blog1, blog2) => blog2.likes - blog1.likes)
		}

		case 'DELETE': {
			const id = action.data			
			return state.filter(blog => blog.id !== id )
		}

		case 'INIT_BLOGS':
			return action.data.sort((blog1, blog2) => blog2.likes - blog1.likes)

		default:
			return state.sort((blog1, blog2) => blog2.likes - blog1.likes)
	} 	
}

export default reducer


