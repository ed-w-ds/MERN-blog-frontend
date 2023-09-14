import axios from 'axios'
// const baseUrl = process.env.REACT_APP_BACKEND_URL+'/api/users' // eslint-disable-line no-undef

const baseUrl = 'https://mern-blog-backend-xabi.onrender.com'+'/api/users'

const signUp = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signUp }