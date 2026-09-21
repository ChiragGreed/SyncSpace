import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api/auth',
    withCredentials: true
})

export const registerApi = async (fullName, email, password, role) => {
    const response = await api.post('/register', { fullName, email, password, role });
    return response.data;
}

export const loginApi = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}

export const getMeApi = async () => {
    const response = await api.get('/');
    return response.data;
}