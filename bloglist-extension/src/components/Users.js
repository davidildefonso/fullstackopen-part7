import React, { useEffect} from 'react'
import { useDispatch,  connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import User from '../components/User'
import { Routes, Route, Link, useMatch   } from "react-router-dom";
import Stack from '@mui/material/Stack';

const UserTable = ({users}) => {
		return (
		<Stack sx={{ p: 4 }} spacing={2} direction="column">
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>	
						<th></th>
						<th>Number of blogs</th>
					</tr>
				{users.map(user =>				
					<tr  key={user.id} >	
						<td>  <Link to={`/users/${user.id}`}>{user.name}</Link> </td>	
						<td align='center'> 	{user.blogs.length}	</td>		
					</tr>  
				)}
				</tbody>
			</table>
		</Stack>
			
	)
}

const Users = (props) => {

	const dispatch = useDispatch()	
	useEffect(() => {
		dispatch(initializeUsers())	
	}, [])		

	const match = useMatch('/users/:id')
	const user = match 
		? props.users.find(user => user.id === match.params.id)
		: null

  return(
	<Stack sx={{ p: 5 }} spacing={2} direction="column">
	
		<Routes>		
			<Route path="/:id" element={<User	user={user}   />} />
			<Route path="/" element={<UserTable	users={props.users}   />} />
		</Routes>		
   </Stack>
  )
}



const mapStateToProps = (state) => {
	return {
		users: state.users
	}  
}


const ConnectedUsers = connect(mapStateToProps)(Users)
export default ConnectedUsers