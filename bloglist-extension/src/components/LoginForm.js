import React from 'react'
import { connect, useDispatch, useSelector  } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/loginReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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

  if(user) return <Stack spacing={2} sx={{ p: 5 }}  direction="column">
		<div>
			<p>  {user.name} logged in   </p>					
		</div>
		<Button style={{ background: '#000' , maxWidth: '5rem'  }}  variant="contained"  onClick={logout}>logout</Button>
	</Stack >


  return (
    <Stack spacing={2}  	  direction="column"   className='login-form-container'>
      <h2  >LOGIN</h2>

      <form id="form" onSubmit={login}>
			<Stack spacing={2} direction="column">
				<Stack spacing={2} direction="row">
					<span>username</span>
					<input
						id="username"
						name='username' 
					/>
				</Stack>
				<Stack spacing={2} direction="row">
					<span>password</span>
					<input
						id="password"
						type="password"
						name='password'          
					/>
				</Stack>
				<Button  style={{ background: '#000', width: '20px' }}  variant="contained"  id="login-button" type="submit">go</Button>
			</Stack>
      </form>
    </Stack>
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