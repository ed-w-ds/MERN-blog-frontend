import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        // action creators are generated for each case reducer function
        setNotification(state, action) {
            console.log('action', action)
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

// thunk action creators
export const setNotificationWithTimeout = (notification, timeout, notifType) => {
    return async dispatch => {
        dispatch(setNotification({ notification, notifType }))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer