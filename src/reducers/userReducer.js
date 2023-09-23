import { createSlice } from '@reduxjs/toolkit'


import { setUsers } from './usersReducer'

import getAllUsers from '../services/users'
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
        setTimeout(() => {
            dispatch(removeUser())
            window.localStorage.removeItem('loggedNoteappUser')
            window.location.reload()
        }, 360000) // 3600000 ms = 1 hour
    }
}

export const signUpUser = async credentials => {
    signUp(credentials)
    setUsers(await getAllUsers())
}

// remove blog from user.blogs once deleted
export const removeBlogFromUser = (id, user) => {
    return async dispatch => {
        const updatedUser = {
            ...user,
            blogs: user.blogs.filter(blog => blog.id !== id)
        }
        dispatch(setUser(updatedUser))
    }
}

export default userSlice.reducer