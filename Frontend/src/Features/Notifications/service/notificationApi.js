import { createHttpClient } from '../../../shared/api/httpClient.js'

const api = createHttpClient('/notifications')

export const getNotificationsApi = async () => {
    const response = await api.get('/')
    return response.data
}

export const markNotificationReadApi = async (notificationId) => {
    const response = await api.patch(`/${notificationId}/read`)
    return response.data
}

export const markAllNotificationsReadApi = async () => {
    const response = await api.patch('/read-all')
    return response.data
}

export const deleteNotificationApi = async (notificationId) => {
    const response = await api.delete(`/${notificationId}`)
    return response.data
}
