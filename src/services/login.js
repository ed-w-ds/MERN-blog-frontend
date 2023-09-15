import axios from 'axios'
// const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/login'
const baseUrl = 'http://localhost:3003/api/login' // for testing
console.log('baseUrl', baseUrl)

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
