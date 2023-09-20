/*eslint linebreak-style: ["error", "unix"]*/
/*eslint indent: ["error", 2]*/
import axios from 'axios'
const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/blogs'
// const baseUrl = 'http://localhost:3003/api/blogs' // for testing

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${ baseUrl }/${id}/comments`, newObject, config)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment
}