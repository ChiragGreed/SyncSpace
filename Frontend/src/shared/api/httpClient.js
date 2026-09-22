import axios from 'axios'

// Single source of truth for the API origin. Falls back to the local dev
// server so nothing breaks if VITE_API_BASE_URL isn't set, but any
// deployment just needs to set the env var instead of editing source.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6500/api'

/**
 * Creates a preconfigured axios instance scoped to one API resource
 * (e.g. '/projects', '/tasks'). Every feature's service file should
 * use this instead of calling axios.create() directly, so base URL,
 * credentials, and future concerns (interceptors, auth refresh, etc.)
 * stay uniform across the app.
 */
export const createHttpClient = (resourcePath = '') => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}${resourcePath}`,
    withCredentials: true,
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Normalize network/timeout failures so calling hooks always get
      // a `.message` they can surface, instead of an opaque Axios error.
      if (!error.response) {
        error.message = 'Unable to reach the server. Please check your connection.'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default createHttpClient
