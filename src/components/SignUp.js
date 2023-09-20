import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'

import signUpService from '../services/signUp'
import userService from '../services/users'

import { redirect } from 'react-router-dom'
import { Box, Paper, TextField, Button, Typography } from '@mui/material'


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
            <Box
                component='form'
                onSubmit={handleSignUp}
            >
                <Box>
                    <Typography variant='h4' style={{ textAlign: 'center', marginRight: '20px' }}>
                        <b>Sign up</b>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', my: '10px' }}>
                    <TextField
                        id='username-input-signup'
                        label='username'
                        placeholder='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Box>
                <Box sx={{ textAlign: 'center', my: '10px' }}>
                    <TextField
                        id='name-input-signup'
                        label='name'
                        placeholder='name'
                        type='text'
                        value={name}
                        name='Name'
                        onChange={({ target }) => setName(target.value)}
                    />
                </Box>
                <Box sx={{ textAlign: 'center', my: '10px' }}>
                    <TextField
                        id='password-input-signup'
                        label='password'
                        placeholder='password'
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                        autoComplete = 'on'
                    />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button id='signUp-button' type='submit' variant='contained'>sign up</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default SignUp