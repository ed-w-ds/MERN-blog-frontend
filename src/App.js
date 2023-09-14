/*eslint linebreak-style: ["error", "unix"]*/
/*eslint indent: ["error", 2]*/
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUserWithTimeout } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

// import components
import Blog from './components/Blog'
import ShowBlog from './components/ShowBlog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ShowUserBlogs from './components/ShowUserBlogs'
import ShowUsers from './components/ShowUsers'
import Login from './components/Login'
import SignUp from './components/SignUp'

// import services
import blogService from './services/blogs'
import userService from './services/users'

import { Container, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './index.css'

// routing
import {
  Routes, Route, Link, redirect
} from 'react-router-dom'

// import lodash
import _ from 'lodash'

const App = () => {
  const [reload, setReload] = useState(false)
  const [blogSelect, setBlogSelect] = useState('byLikes')
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector(state => state.user)

  // get all users
  useEffect(() => {
    const getTheUsers = async () => {
      const users = await userService.getAllUsers()
      dispatch(getUsers(users))
    }
    getTheUsers()
  }, [])

  // get all blogs
  useEffect(() => {
    const getBlogs = async () => {
      if (!user) {
        return
      }
      dispatch(initializeBlogs())
    }
    getBlogs()
  }, [user, reload])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserWithTimeout(user))
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setTimeout(async() => {
      window.location.reload()
      redirect('/')
    }, 0)
    // dispatch(setNotificationWithTimeout('Logged out', 5, 'success'))
  }

  // show blogs
  // by likes
  const showBlogs = () => (
    <div id="blog">
      <h2>blogs (sorted by likes)</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )

  const showBlogsByTitle = () => (
    <div id="blog">
      <h2>blogs (sorted by title)</h2>
      {_.sortBy(blogs, [blog => blog.title.toLowerCase()]).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )

  //update blog
  const updateBlog = async (id, blogObject, blogUserName, usersWhoLiked) => {
    try {
      blogObject.usersWhoLiked = usersWhoLiked
      const blog = await blogService.updateBlog(id, blogObject)
      const updatedBlog = await {
        ...blog,
        user: {
          name: blogUserName
        },
        usersWhoLiked: usersWhoLiked
      }

      blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      reload ? setReload(false) : setReload(true)
    } catch (exception) {
      dispatch(setNotificationWithTimeout('Error updating blog', 5))
    }
  }

  // delete blog
  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)

      blogs.filter(blog => blog.id !== id)
      reload ? setReload(false) : setReload(true)
    } catch (exception) {
      dispatch(setNotificationWithTimeout('Error deleting blog', 5))
    }
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      color: 'orange'
    },
  })

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {user === null || window.localStorage.getItem('loggedNoteappUser') === null
          ?
          <>
            <Notification />
            <h2>Log in to application</h2>
            <Login />
            <SignUp />
          </>
          :
          <>
            <div className='navStyle'>
              <Link to="/">home</Link>
              <Link to="/users">users</Link>
              { user === null
                ? null
                :
                <>
                  <b>{user.name} logged-in</b>
                  <Link to="/"><Button variant="contained" onClick={logout}>logout</Button></Link>
                </>
              }
            </div>
            <Notification />
            <Routes>
              <Route path="/" element={
                <>
                  <Togglable buttonLabel="add new blog" ref={ blogFormRef }>
                    <BlogForm
                      user = {user}
                    />
                  </Togglable>
                  <Button variant="contained" onClick={() => setBlogSelect('byLikes')}>sort by likes</Button>
                  <Button variant="contained" onClick={() => setBlogSelect('byTitle')}>sort by title</Button>
                  {blogSelect === 'byLikes' ?
                    showBlogs()
                    :
                    showBlogsByTitle()
                  }
                </>
              } />
              <Route path="/users" element={ <ShowUsers /> } />
              <Route path="/users/:id" element={ <ShowUserBlogs /> } />
              <Route path="/blogs/:id" element={ <ShowBlog
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </>
        }
      </ThemeProvider>
    </Container>
  )
}

export default App