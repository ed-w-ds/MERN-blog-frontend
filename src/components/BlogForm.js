import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import { Box, TextField, Button } from '@mui/material'

// const BlogForm = ({ createBlog }) => {
const BlogForm = ({ user }) => {
    // const [newBlog, setNewBlog] = useState('')
    // const [newAuthor, setNewAuthor] = useState('')
    // const [newUrl, setNewUrl] = useState('')
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
        // console.log('addBlog', newBlog, newAuthor, newUrl)

        // createBlog({
        //     // the parameters that are passed to the addBlog function in app.js
        //     // that is passed as createBlog to this component
        //     // the three parameters are passed as an object
        //     title: newBlog,
        //     author: newAuthor,
        //     url: newUrl
        // })

        // setNewBlog('')
        // setNewAuthor('')
        // setNewUrl('')

        dispatch(setNotificationWithTimeout(`a new blog ${newBlog} by ${newAuthor} added`, 5, 'success'))
    }

    //     import Box from '@mui/material/Box';
    // import TextField from '@mui/material/TextField';

    // export default function FormPropsTextFields() {
    //   return (
    //     <Box
    //       component="form"
    //       sx={{
    //         '& .MuiTextField-root': { m: 1, width: '25ch' },
    //       }}
    //       noValidate
    //       autoComplete="off"
    //     >
    //       <div>
    //         <TextField
    //           required
    //           id="outlined-required"
    //           label="Required"
    //           defaultValue="Hello World"
    //         />
    //         <TextField
    //           disabled
    //           id="outlined-disabled"
    //           label="Disabled"
    //           defaultValue="Hello World"
    //         />
    //         <TextField
    //           id="outlined-password-input"
    //           label="Password"
    //           type="password"
    //           autoComplete="current-password"
    //         />

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
                        // value={newBlog}
                        // onChange={(event) => setNewBlog(event.target.value)}
                        name="Title"
                        label='title'
                    />
                    <TextField
                        required
                        id='author-input'
                        // value={newAuthor}
                        // onChange={(event) => setNewAuthor(event.target.value)}
                        name="Author"
                        label='author'
                    />
                    <TextField
                        id='url-input'
                        // value={newUrl}
                        // onChange={(event) => setNewUrl(event.target.value)}
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


