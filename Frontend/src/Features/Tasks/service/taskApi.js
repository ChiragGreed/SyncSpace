import { createHttpClient } from '../../../shared/api/httpClient.js'

const api = createHttpClient('/tasks')

export const createTaskApi = async (title, description, projectId, status, priority, assignee, dueDate) => {
    const response = await api.post('/', { title, description, projectId, status, priority, assignee, dueDate })
    return response.data
}

export const getTasksApi = async () => {
    const response = await api.get('/')
    return response.data
}

export const getTaskApi = async (taskId) => {
    const response = await api.get(`/${taskId}`)
    return response.data
}

export const updateTaskApi = async (taskId, data) => {
    const response = await api.patch(`/${taskId}`, data)
    return response.data
}

export const updateTaskStatusApi = async (taskId, status) => {
    const response = await api.patch(`/${taskId}/status`, { status })
    return response.data
}

export const deleteTaskApi = async (taskId) => {
    const response = await api.delete(`/${taskId}`)
    return response.data
}
