import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { appendBlog, setBlogs } = blogSlice.actions

// by likes
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await blogs.sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const createNewBlog = (blogObject, user) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blogObject)
        const updatedBlog = {
            ...newBlog,
            user: {
                name: user.name
            }
        }
        dispatch(appendBlog(updatedBlog))
    }
}

export const createNewComment = (id, commentObject) => {
    return async dispatch => {
        await blogService.createComment(id, commentObject)
        dispatch(initializeBlogs())
    }
}

export default blogSlice.reducer