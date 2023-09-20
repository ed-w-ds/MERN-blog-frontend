/* eslint-disable */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography } from '@mui/material'

const Blog = ({ blog }) => {

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={6} >
      <Card>
        <CardContent>
            <Typography variant="h6">
              <b>Title:</b> {blog.title}
            </Typography>
            <Typography variant="p">
                <b>Author:</b> {blog.author}
            </Typography>
            <Typography variant="p" sx={{ display: 'block' }}>
                <b>Likes:</b> {blog.likes}
            </Typography>
            <Link to={`/blogs/${blog.id}`} style={ linkStyle }>
              <Typography variant="p">
                  <div className='link'>see more...</div>
              </Typography>
            </Link>
        </CardContent>
      </Card>
    </Grid>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog