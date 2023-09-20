import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Grid, Card, CardContent, Typography } from '@mui/material'

const ShowUserBlogs = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    if (!users) {
        return <p>loading...</p>
    }
    const user = users.find(user => user.id === id)

    if (!user) {
        return <p>error - user cannot be found</p>
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>{user.name}&apos;s blogs</h2>
            {user.blogs.length === 0 ? (
                <p style={{ textAlign: 'center' }}>This user has no blogs added... yet</p>
            ) : (
                <Grid container spacing={2} sx={{ mb: '20px' }}>
                    {user.blogs.map((blog) => (
                        <Grid item key={blog.id} xs={12} sm={6} md={6} lg={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        <b>Title:</b> {blog.title}
                                    </Typography>
                                    <Typography variant="p" sx={{ display: 'block' }}>
                                        <b>Author:</b> {blog.author}
                                    </Typography>
                                    <Typography variant="p" sx={{ display: 'block' }}>
                                        <b>Likes:</b> {blog.likes}
                                    </Typography>
                                    <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography variant="p">
                                            <div className="link">See more...</div>
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    )
}

export default ShowUserBlogs