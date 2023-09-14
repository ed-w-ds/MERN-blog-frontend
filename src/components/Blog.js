/* eslint-disable */
// import { useDispatch } from 'react-redux'
// import { useState } from 'react'
import PropTypes from 'prop-types'
// import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({blog, updateBlog, deleteBlog, user}) => {

  // const [showDetails, setShowDetails] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)

  // const dispatch = useDispatch()

  // const hideWhenShowDetails = { display: showDetails ? '' : 'none' }
  // const buttonLabel = showDetails ? 'hide' : 'view'

  // const toggleShowDetails = () => {
  //   setShowDetails(!showDetails)
  // }

  // const handleLike = () => {
  //   setLikes(likes + 1)
  //   if (blog.user?.name) {
  //     updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name)
  //   }
  //   else {
  //     updateBlog(blog.id, { ...blog, likes: likes + 1 }, '')
  //   }
  //   dispatch(setNotificationWithTimeout(`you voted '${blog.title}' by ${blog.author}`, 5))
  // //   updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name)
  // }

  // const handleDelete = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
  //     deleteBlog(blog.id)
  //   }
  //   dispatch(setNotificationWithTimeout(`you deleted '${blog.title}'`, 5))
  // }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }
  const blogStyle = {
    color: 'white',
    textdecoration: 'none',
  }

  return (
    <div className='blog' style={ blogStyle }>
      <Link to={`/blogs/${blog.id}`}>
        <p className='titleAuthor'><b>Title:</b> {blog.title} || <b>Author:</b> {blog.author}</p>
      </Link>
    </div>  
  )  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog