import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';

const Togglable = React.forwardRef ((props, ref ) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

   useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })


	const TogglableStyle = {
		marginTop: 10,
		marginBottom: 10
	}

  return (
    <div style={TogglableStyle} >
      <div style={hideWhenVisible}>
        <Button style={{ background: '#000', maxWidth: '5rem' }}  variant="contained"  onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={{ background: '#000', maxWidth: '5rem' }}  variant="contained" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}



export default Togglable