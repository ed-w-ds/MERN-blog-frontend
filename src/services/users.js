import axios from 'axios'
const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/users'

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAllUsers }