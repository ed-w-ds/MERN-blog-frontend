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
            console.log('action.payload in blogSlice/setNotes', action.payload)
            return action.payload
        },
        // updateLikes(state, action) {
        //     const id = action.payload.id
        //     const blogToChange = state.find(blog => blog.id === id)
        //     const changedBlog = {
        //         ...blogToChange,
        //         likes: action.payload.likes
        //     }
        //     return state.map(blog => blog.id !== id ? blog : changedBlog)
        // },
    },
})

export const { appendBlog, setBlogs } = blogSlice.actions

// by likes
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await blogs.sort((a, b) => b.likes - a.likes)
        console.log('sortedBlogs in initializeBlogs', sortedBlogs)
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
        console.log('newBlog in createNewBlog from blogsreducer', newBlog)
        dispatch(appendBlog(updatedBlog))
    }
}

export const createNewComment = (id, commentObject) => {
    return async dispatch => {
        const newComment = await blogService.createComment(id, commentObject)
        console.log('newComment in createNewComment from blogsreducer', newComment)
        dispatch(initializeBlogs())
    }
}

// export const updateLikesInBlog = (id, blogObject) => {
//     return async dispatch => {
//         const updatedBlog = await blogService.updateBlog(id, blogObject)
//         console.log('updatedBlog in updateLikesInBlog from blogsreducer', updatedBlog)
//         dispatch(initializeBlogs())
//     }
// }

export default blogSlice.reducer