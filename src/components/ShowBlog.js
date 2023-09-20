import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { createNewComment } from '../reducers/blogsReducer'

import { Box, TextField, Button, Typography, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'

const ShowBlog = ({ updateBlog, deleteBlog, user }) => {
    let blog = null
    useEffect(() => {
        if (!blog) {
            return
        }
        setLikes(blog.likes)
    }, [blog])

    const [likes, setLikes] = useState(blog ? blog.likes : 0)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const id = useParams().id

    const blogs = useSelector(state => state.blogs)

    const match = useMatch(`/blogs/${id}`)
    blog = match ? blogs.find(blog => blog.id === id) : null

    const users = useSelector(state => state.users)

    const findUser = users?.find(u => u.name === user.name)

    const handleLike = () => {
        setLoading(true)
        if (blog?.usersWhoLiked.length > 0 && findUser.id === blog.usersWhoLiked.find(id => id === findUser.id)) {
            setLoading(false)
            return dispatch(setNotificationWithTimeout('you already liked this blog', 3, 'error'))
        }
        setLikes(likes + 1)
        const addUserToBlogLikes = blog.usersWhoLiked.concat(findUser.id)
        if (blog.user?.name) {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name, addUserToBlogLikes)
                .then(() => dispatch(setNotificationWithTimeout(`you voted '${blog.title}' by ${blog.author}`, 3, 'success')))
                .catch(() => dispatch(setNotificationWithTimeout('Error liking blog', 3, 'error')))
                .finally(() => setLoading(false))
        }
        else {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, '', addUserToBlogLikes)
        }
    }

    const navigate = useNavigate()
    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteBlog(blog.id)
            navigate('/')
            dispatch(setNotificationWithTimeout(`you deleted '${blog.title}'`, 3, 'success'))
        }
        else {
            dispatch(setNotificationWithTimeout(`you did not delete '${blog.title}'`, 3, 'error'))
        }
    }

    const addComment = (event) => {
        event.preventDefault()
        const eve = event.target.Comment.value
        const commentObject = {
            comment: eve
        }
        dispatch(createNewComment(blog.id, commentObject))
        if (eve === '') {
            dispatch(setNotificationWithTimeout('you did not enter a comment', 3, 'error'))
        }
        else {
            dispatch(setNotificationWithTimeout(`you commented '${eve}' on '${blog.title}'`, 3, 'success'))
        }
        event.target.Comment.value = ''
    }

    if (!blog) {
        return <p>loading...</p>
    }

    const getComments = () => {
        if (blog.comments) {
            return (
                <div>
                    <h2 style={{ textAlign: 'center', flexWrap: 'wrap' }}>Comments</h2>
                    <CommentForm />
                    <ul style={{ marginRight: '40px', wordWrap: 'break-word' }}>
                        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <>
                    <h3>Comments</h3>
                    <CommentForm />
                    <p>No comments yet... Be the first to add one!</p>
                </>
            )
        }
    }

    const CommentForm = () => {
        return (
            <Box
                component='form'
                onSubmit={addComment}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <TextField
                    required
                    id='comment-input'
                    name='Comment'
                    placeholder='comment'
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        display: 'block',
                    }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{
                        backgroundColor: deepPurple[600],
                        color: 'white',
                        margin: '5px',
                        opacity: '0.8',
                        padding: '10px 25px',
                    }}>
                    add comment
                </Button>
            </Box>
        )
    }

    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}
        >
            <Box
                sx={{
                    border: 1,
                    borderRadius: 4,
                    borderColor: 'white',
                    backgroundColor: '#282424',
                    flex: 1,
                    marginRight: '16px',
                    maxWidth: '50%',
                }}>
                <Box className='blog' sx={{ padding: '10px' }}>
                    <Typography className='titleAuthor'>
                        <b>Title:</b> {blog.title}
                    </Typography>
                    <Typography className='titleAuthor'>
                        <b>Author:</b> {blog.author}
                    </Typography>
                    { loading
                        ? <p> loading likes... </p>
                        : <p className='likes'><b>Likes:</b> {blog.likes} <Button variant='contained' size='small' onClick={ handleLike } id='like-btn'>like</Button></p>}
                    {blog.url? <p><b>Url:</b> {blog.url}</p> : null}
                    {(blog.user?.name) ? <p><b>User: </b>{blog.user.name}</p> : null}
                    {user.name === blog.user?.name ? <Button id='logoutBtn' startIcon={<DeleteIcon fontSize='medium' />} variant='contained' onClick={ handleDelete }>remove blog</Button> : null}
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: '#282424',
                    border: 1,
                    borderRadius: 4,
                    borderColor: 'white',
                    maxWidth: '50%',
                }}>
                {getComments()}
            </Box>
        </Grid>
    )
}

export default ShowBlog