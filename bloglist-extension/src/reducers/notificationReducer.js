
const initialState = {
	content : '',
	style:  {
		display: 'none',
		border: 'solid',
		padding: 10,
		borderWidth: 1
	},
	timeout: null
}



const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return  	{
					content: action.data.content ,
					style:  {		
						border: 'solid',
						padding: 10,
						borderWidth: 1
					},
					timeout: action.data.timeout		
				}

	case 'HIDE':
      return initialState	
    default:
      return state
  }
}

export const showNotification = (data) => {
  return {
    type: 'SHOW',
    data
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
    
  }
}




export default notificationReducer