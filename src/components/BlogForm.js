import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import { Box, TextField, Button } from '@mui/material'
import { deepPurple } from '@mui/material/colors'

const BlogForm = ({ user }) => {
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = event.target.Title.value
        const newAuthor = event.target.Author.value
        const newUrl = event.target.Url.value
        event.target.Title.value = ''
        event.target.Author.value = ''
        event.target.Url.value = ''
        if (newBlog === '' || newAuthor === '' || newUrl === '') {
            dispatch(setNotificationWithTimeout('Title and Author are required', 5, 'error'))
            return
        }
        dispatch(createNewBlog({
            title: newBlog,
            author: newAuthor,
            url: newUrl
        }
        , user))

        dispatch(setNotificationWithTimeout(`a new blog ${newBlog} by ${newAuthor} added`, 5, 'success'))
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginRight: '20px' }}>Create a new blog</h2>
            <Box
                onSubmit={addBlog}
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    textAlign: 'center',
                    mr: '25px',
                }}
            >
                <div>
                    <TextField
                        required
                        id='title-input'
                        name='Title'
                        label='title'
                    />
                    <TextField
                        required
                        id='author-input'
                        name='Author'
                        label='author'
                    />
                    <TextField
                        required
                        id='url-input'
                        name='Url'
                        label='url'
                    />
                </div>
                <Button
                    id='submit-button'
                    type='submit'
                    variant='contained'
                    size='small'
                    sx={{
                        backgroundColor: deepPurple[600],
                        color: 'white',
                        margin: '5px',
                        opacity: '0.8',
                        padding: '10px 25px',
                    }}
                > save </Button>
            </Box>
        </div>
    )
}

export default BlogForm