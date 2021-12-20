import React from 'react'
import { connect, useDispatch, useSelector  } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/loginReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
	const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)
	const user = useSelector(state => state.user)

	const login =   (event) => {
		event.preventDefault()

	

		props.loginUser({
			username: event.target.username.value,
			password: event.target.password.value
		})	

		event.target.username.value = ''	
		event.target.password.value


		if(timeout){
				clearTimeout(timeout)
				dispatch(hideNotification())
		}

		dispatch(showNotification( {
			content:  "LOGIN SUCCESS!",
			timeout: setTimeout(() => {
					dispatch(hideNotification())
			}, 3000)
		} ))
		

  }

  const logout = () => { 
	props.logoutUser()
  }

  if(user) return <button  onClick={logout}>logout</button>


  return (
    <div>
      <h2>Login</h2>

      <form id="form" onSubmit={login}>
        <div>
          username
          <input
			id="username"
            name='username'
            
          />
        </div>
        <div>
          password
          <input
			id="password"
            type="password"
            name='password'          
          />
      </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: value => {
      dispatch(loginUser(value))
    },
	logoutUser: () => {
      dispatch(logoutUser())
    },
  }
}



export default connect(
  null, 
  mapDispatchToProps
)(LoginForm)