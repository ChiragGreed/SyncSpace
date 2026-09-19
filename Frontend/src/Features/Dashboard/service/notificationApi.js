import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api/notifications',
    withCredentials: true
})

export const getNotificationsApi = async () => {
    const response = await api.get('/');
    return response.data;
}

export const markNotificationReadApi = async (notificationId) => {
    const response = await api.patch(`/${notificationId}/read`);
    return response.data;
}

export const markAllNotificationsReadApi = async () => {
    const response = await api.patch('/read-all');
    return response.data;
}

export const deleteNotificationApi = async (notificationId) => {
    const response = await api.delete(`/${notificationId}`);
    return response.data;
}
