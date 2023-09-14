import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { createNewComment } from '../reducers/blogsReducer'

const ShowBlog = ({ updateBlog, deleteBlog, user }) => {
    let blog = null
    useEffect(() => {
        if (!blog) {
            return
        }
        setLikes(blog.likes)
    }, [blog])

    const [likes, setLikes] = useState(blog ? blog.likes : 0)
    console.log('likes', likes)

    const dispatch = useDispatch()
    const id = useParams().id
    console.log('id', id)

    const blogs = useSelector(state => state.blogs)
    console.log('blogs', blogs)

    const match = useMatch(`/blogs/${id}`)
    console.log('match', match)
    blog = match ? blogs.find(blog => blog.id === id) : null
    console.log('blog', blog)

    const users = useSelector(state => state.users)
    console.log('users', users)

    const findUser = users?.find(u => u.name === user.name)
    console.log('findUser', findUser)

    const handleLike = () => {
        if (blog?.usersWhoLiked.length > 0 && findUser.id === blog.usersWhoLiked.find(id => id === findUser.id)) {
            return dispatch(setNotificationWithTimeout('you already liked this blog', 3, 'error'))
        }
        setLikes(likes + 1)
        const addUserToBlogLikes = blog.usersWhoLiked.concat(findUser.id)
        if (blog.user?.name) {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name, addUserToBlogLikes)
        }
        else {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, '', addUserToBlogLikes)
        }
        dispatch(setNotificationWithTimeout(`you voted '${blog.title}' by ${blog.author}`, 3, 'success'))
    }

    const navigate = useNavigate()
    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteBlog(blog.id)
        }
        navigate('/')
        dispatch(setNotificationWithTimeout(`you deleted '${blog.title}'`, 3, 'success'))
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
                <>
                    <h3>Comments</h3>
                    <CommentForm />
                    <ul>
                        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
                    </ul>
                </>
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

    // reformat
    const CommentForm = () => {
        return (
            <form onSubmit={addComment}>
                <input
                    id='comment-input'
                    name='Comment'
                    placeholder='comment'
                />
                <button type='submit'>add comment</button>
            </form>
        )
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blog'>
            <p className='titleAuthor'><b>Title:</b> {blog.title} || <b>Author:</b> {blog.author}</p>
            <p className='likes'>Likes: {blog.likes} <button onClick={ handleLike }>like</button></p>
            {blog.url? <p>Url: {blog.url}</p> : null}
            {(blog.user?.name) ? <p>{blog.user.name}</p> : null}
            {user.name === blog.user?.name ? <button onClick={ handleDelete } >remove</button> : null}
            {getComments()}
        </div>
    )
}

export default ShowBlog