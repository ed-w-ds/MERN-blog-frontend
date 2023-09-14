import axios from 'axios'
const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/users'
// const baseUrl = 'http://localhost:3003/api/users' // for testing

const signUp = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signUp }