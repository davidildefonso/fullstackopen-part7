
import blogService from '../services/blogs'
import loginService from '../services/login'


export const loginUser = (userData) => { 
    return async dispatch => {
		const user = await loginService.login(userData)
		window.localStorage.setItem(
			'loggedBlogappUser', JSON.stringify(user)
		) 
	
		blogService.setToken(user.token)

		dispatch({
			type: 'LOGIN',
			user,
		})
	}
}

export const logoutUser = () => {
	window.localStorage.removeItem('loggedBlogappUser')
	return {
		type: 'LOGOUT',
		user: null,
	}
}


// export	const logoutUser = () => {
// 	return  dispatch => {
// 		window.localStorage.removeItem('loggedBlogappUser')	
// 		dispatch({
// 			type: 'LOGOUT',
// 			user: null,
// 		})
// 	}		
// }



export const getLoggedUser = () => {
   return  dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
	const user = JSON.parse(loggedUserJSON)
	if(user){
		blogService.setToken(user.token)
		dispatch({
			type: 'GET_LOGGED_USER',
			user: loggedUserJSON,
		})
	}else{
		dispatch({
			type: 'LOGOUT'
			
		})
	}
	
  }


}


const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return  action.user
	case 'LOGOUT':
      return  null
	case 'GET_LOGGED_USER':
      return  action.user ? JSON.parse(action.user) : null
    default:
      return state
  }
}

export default loginReducer