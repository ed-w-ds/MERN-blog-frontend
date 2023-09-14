import { useState } from 'react'
import { useDispatch } from 'react-redux'

// import { signUpUser } from '../reducers/userReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'

import signUpService from '../services/signUp'
import userService from '../services/users'
// import blogService from '../services/blogs'

import { redirect } from 'react-router-dom'


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignUp = async (event) => {
        event.preventDefault()

        console.log('logging in with', username, password)

        try {
            await signUpService.signUp({
                username, name, password,
            })

            const users = await userService.getAllUsers()
            console.log('users in app', users)
            dispatch(getUsers(users))

            // window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

            // blogService.setToken(user.token)
            // dispatch(setUserWithTimeout(user))
            // dispatch(signUpUser(user))
            setUsername('')
            setName('')
            setPassword('')
            redirect('/')
        } catch (exception) {
            console.log('exception', exception)
            dispatch(setNotificationWithTimeout('Wrong credentials', 5))
        }
    }

    return (
        <form onSubmit={handleSignUp}>
            <div>
                username
                <input
                    id="username-input-signup"
                    placeholder="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                name
                <input
                    id="name-input-signup"
                    placeholder="name"
                    type="text"
                    value={name}
                    name="Name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password-input-signup"
                    placeholder="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    autoComplete = "on"
                />
            </div>
            <button id="signUp-button" type="submit">sign up</button>
        </form>
    )
}

export default SignUp