import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUserWithTimeout } from '../reducers/userReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { redirect } from 'react-router-dom'
import { Typography } from '@mui/material'

import { Box } from '@mui/system'
import { Button, TextField, Paper } from '@mui/material'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

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
            dispatch(setNotificationWithTimeout('Wrong credentials', 5))
        }
    }

    return (
        <Paper elevation={5} sx={{
            m: '10px',
            p: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '50%',
            margin: 'auto',
            mt: '20px',
            minWidth: '300px',
        }}>
            <form onSubmit={handleLogin}>
                <Box sx={{ m: '10px' }}>
                    <Typography variant='h4' sx={{ textAlign: 'center', m: '10px' }}>
                        <b>Log in to application</b>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', my: '10px' }}>
                    <TextField
                        id='username-input'
                        label='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Box>
                <Box sx={{ textAlign: 'center', my: '10px' }}>
                    <TextField
                        id='password-input'
                        label='password'
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                        autoComplete = 'on'
                    />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button id='login-button' type='submit' variant='contained'>login</Button>
                </Box>
            </form>
        </Paper>
    )
}

export default LoginForm