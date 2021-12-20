


const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return  action.value

    default:
      return state
  }
}

export const filterValue = (value) => {
  return {
    type: 'FILTER',
    value
  }
}





export default filterReducer