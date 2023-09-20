import { Link } from 'react-router-dom'
import { Button, Typography, AppBar, Toolbar, Box } from '@mui/material'

const Navbar = ({ user, logout }) => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '5px',
        margin: '5px',
    }

    const boxStyle = {
        margin: '5px 0px 5px 0px',
        padding: '5px',
    }

    return (
        <Box sx={{ alignItems: 'flex-start' }} style={ boxStyle }>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='div'>
                        <Link to='/' style={ linkStyle }>home</Link>
                    </Typography>
                    <Typography variant='h6' component='div'>
                        <Link to='/users' style={ linkStyle }>users</Link>
                    </Typography>
                    { user === null
                        ? null
                        :
                        <>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', mr:'50px' }}>
                                <b>{user.name} logged-in</b>
                            </Typography>
                            <Link to='/'><Button id='logoutBtn' variant='contained' onClick={logout}>logout</Button></Link>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar