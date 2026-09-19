import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api/tasks',
    withCredentials: true
})

export const createTaskApi = async (title, description, projectId, status, priority, assignee) => {
    const response = await api.post('/', { title, description, projectId, status, priority, assignee });
    return response.data;
}

export const getTasksApi = async () => {
    const response = await api.get('/');
    return response.data;
}

export const getTaskApi = async (taskId) => {
    const response = await api.get(`/${taskId}`);
    return response.data;
}

export const updateTaskApi = async (taskId, data) => {
    const response = await api.patch(`/${taskId}`, data);
    return response.data;
}

export const updateTaskStatusApi = async (taskId, status) => {
    const response = await api.patch(`/${taskId}/status`, { status });
    return response.data;
}

export const deleteTaskApi = async (taskId) => {
    const response = await api.delete(`/${taskId}`);
    return response.data;
}
