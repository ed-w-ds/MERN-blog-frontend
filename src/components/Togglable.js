import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // this is used to expose the toggleVisibility function to the parent component
    // in this case the App component
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    const buttonAlign = {
        textAlign: 'right',
        contentAlign: 'center',
    }

    const buttonStyle = {
        backgroundColor: props.buttonColor,
        color: 'white',
    }

    return (
        <div>
            <div style={{ ...hideWhenVisible, ...buttonAlign }}>
                <Button onClick={toggleVisibility} id='addBlogBtn' style={buttonStyle}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {/* props.children is used for refrencing the child components of a component
                e.g the usage for togglable is placing another component inside the toggle component
                or rather passing it as a child of Togglable component */}
                {props.children}
                <div id='hideBtnDiv'>
                    <Button onClick={toggleVisibility} id='hideBtn' style={ buttonStyle }>hide</Button>
                </div>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable