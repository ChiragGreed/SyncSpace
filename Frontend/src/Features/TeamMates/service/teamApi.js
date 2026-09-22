import { createHttpClient } from '../../../shared/api/httpClient.js'

const api = createHttpClient('/team')

export const searchUsersApi = async (search = '') => {
    const response = await api.get('/', { params: { search } })
    return response.data
}

export const getRecentTeammatesApi = async () => {
    const response = await api.get('/recent')
    return response.data
}
