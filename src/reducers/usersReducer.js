import { createSlice } from '@reduxjs/toolkit'
// import userService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        // action creators are generated for each case reducer function
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const getUsers = (users) => {
    return async dispatch => {
        // const users = await userService.getAllUsers()
        // console.log('users in getUsers', users)
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer