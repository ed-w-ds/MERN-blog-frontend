/* eslint-disable */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const ShowUsers = () => {
    const users = useSelector(state => state.users)

    return (
        users ? 
            <div>
                <h2>Users</h2>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>user</TableCell>
                        <TableCell>blogs created</TableCell>
                    </TableRow>
                    </TableHead>
                    <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                </TableContainer>
            </div>
            : 
            <p>loading...</p>
    )
}

export default ShowUsers