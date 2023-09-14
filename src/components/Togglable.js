import { useState, forwardRef, useImperativeHandle } from 'react'

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

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* props.children is used for refrencing the child components of a component
                e.g the usage for togglable is placing another component inside the toggle component
                or rather passing it as a child of Togglable component */}
                {props.children}
                <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable

// import { useState } from 'react'

// const Togglable = ( (props) => {
//     const [visible, setVisible] = useState(false)

//     const hideWhenVisible = { display: visible ? 'none' : '' }
//     const showWhenVisible = { display: visible ? '' : 'none' }

//     const toggleVisibility = () => {
//         setVisible(!visible)
//     }

//     return (
//         <div>
//             <div style={hideWhenVisible}>
//                 <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//             </div>
//             <div style={showWhenVisible}>
//                 {/* props.children is used for refrencing the child components of a component
//                 e.g the usage for togglable is placing another component inside the toggle component
//                 or rather passing it as a child of Togglable component */}
//                 {props.children}
//                 <button onClick={toggleVisibility}>cancel</button>
//             </div>
//         </div>
//     )
// })

// export default Togglable