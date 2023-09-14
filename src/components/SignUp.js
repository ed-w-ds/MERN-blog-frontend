import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'

import signUpService from '../services/signUp'
import userService from '../services/users'

import { redirect } from 'react-router-dom'


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignUp = async (event) => {
        event.preventDefault()

        try {
            await signUpService.signUp({
                username, name, password,
            })

            const users = await userService.getAllUsers()
            dispatch(getUsers(users))

            setUsername('')
            setName('')
            setPassword('')
            redirect('/')
        } catch (exception) {
            dispatch(setNotificationWithTimeout('Sign up unsuccessful', 5))
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