/* eslint-disable */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {
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
  blog: PropTypes.object.isRequired
}

export default Blog