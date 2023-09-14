import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUserWithTimeout } from '../reducers/userReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { redirect } from 'react-router-dom'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            dispatch(setUserWithTimeout(user))
            setUsername('')
            setPassword('')
            redirect('/')
        } catch (exception) {
            console.log('Wrong credentials')
            dispatch(setNotificationWithTimeout('Wrong credentials', 5))
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id="username-input"
                    placeholder="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password-input"
                    placeholder="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    autoComplete = "on"
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm