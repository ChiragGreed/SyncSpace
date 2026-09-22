import { createHttpClient } from '../../../shared/api/httpClient.js'

const api = createHttpClient('/ai')

export const generateTasksApi = async (title, description) => {
    const response = await api.post('/generate-tasks', {
        title,
        description,
    })

    return response.data
}