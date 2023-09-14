import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import { Box, TextField, Button } from '@mui/material'

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
            <h2>Create a new blog</h2>
            <Box
                onSubmit={addBlog}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <div>
                    <TextField
                        required
                        id='title-input'
                        name="Title"
                        label='title'
                    />
                    <TextField
                        required
                        id='author-input'
                        name="Author"
                        label='author'
                    />
                    <TextField
                        id='url-input'
                        name="Url"
                        label='url'
                    />
                </div>
                <Button
                    id="submit-button"
                    type="submit"
                    variant="outlined"
                    size="small"
                    color="secondary"
                > save </Button>
            </Box>
        </div>
    )
}

export default BlogForm