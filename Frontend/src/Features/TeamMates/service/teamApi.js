import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:6500/api/team",
    withCredentials: true
})

export const searchUsersApi = async (search = '') => {
    const response = await api.get('/', { params: { search } });
    return response.data;
}

export const getRecentTeammatesApi = async () => {
    const response = await api.get('/recent');
    return response.data;
}