import axios from 'axios'

const API_BASE_URL = 'https://syncspace-bz0v.onrender.com/api'

export const createHttpClient = (resourcePath = '') => {
    const instance = axios.create({
        baseURL: `${API_BASE_URL}${resourcePath}`,
        withCredentials: true,
    })

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!error.response) {
                error.message = 'Unable to reach the server. Please check your connection.'
            }

            return Promise.reject(error)
        }
    )

    return instance
}

export default createHttpClient