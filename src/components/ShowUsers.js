/* eslint-disable */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Typography } from '@mui/material'

const ShowUsers = () => {
    const users = useSelector(state => state.users)

    return (
        users ? 
            <div>
                <Typography variant='h4' sx={{ textAlign: 'center', m: '10px'}}><b>Users</b></Typography>
                <TableContainer component={Paper} sx={{ m: '10px 0px' }}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>user</TableCell>
                        <TableCell>blogs created</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(user =>
                        <TableRow key={user.id}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            : 
            <p>loading...</p>
    )
}

export default ShowUsers