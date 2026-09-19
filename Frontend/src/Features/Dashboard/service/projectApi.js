import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api/projects',
    withCredentials: true
})

export const createProjectApi = async (title, description, status, dueDate) => {
    const response = await api.post('/', { title, description, status, dueDate });
    return response.data;
}

export const getProjectsApi = async () => {
    const response = await api.get('/');
    return response.data;
}

export const getProjectApi = async (projectId) => {
    const response = await api.get(`/${projectId}`);
    return response.data;
}

export const getProjectTasksApi = async (projectId) => {
    const response = await api.get(`/${projectId}/task`);
    return response.data;
}

export const updateProjectApi = async (projectId, data) => {
    const response = await api.patch(`/${projectId}`, data);
    return response.data;
}

export const updateProjectStatusApi = async (projectId, status) => {
    const response = await api.patch(`/${projectId}/status`, { status });
    return response.data;
}

export const deleteProjectApi = async (projectId) => {
    const response = await api.delete(`/${projectId}`);
    return response.data;
}
