import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const notificationText = notification.notification
    const notifType = notification.notifType

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        margin: 10
    }

    if (notification === '') {
        style.display = 'none'
    }
    else {
        style.display = ''
    }

    return (
        <div style={style} id='notification'>
            { notifType==='success'
                ?
                <Alert severity="success">
                    {notificationText}
                </Alert>
                :
                <Alert severity="error">
                    {notificationText}
                </Alert>
            }
        </div>
    )
}

export default Notification