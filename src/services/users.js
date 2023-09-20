import axios from 'axios'
const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/users'
// const baseUrl = 'http://localhost:3003/api/users' // for testing

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAllUsers }