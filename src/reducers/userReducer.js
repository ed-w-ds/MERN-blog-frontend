import { createSlice } from '@reduxjs/toolkit'

import signUp from '../services/signUp'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        // action creators are generated for each case reducer function
        setUser(state, action) {
            return action.payload
        },
        signUpUser(state, action) {
            return action.payload
        },
        removeUser() {
            return ''
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export const setUserWithTimeout = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
        console.log('user in setUserWithTimeout', user)
        setTimeout(() => {
            dispatch(removeUser())
            window.localStorage.removeItem('loggedNoteappUser')
            window.location.reload()
        }, 360000) // 3600000 ms = 1 hour
    }
}

export const signUpUser = async credentials => {
    signUp(credentials)
}

export default userSlice.reducer