import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api/invitations',
    withCredentials: true
})

export const createInvitationApi = async (projectId, receiversId) => {
    const response = await api.post('/', { projectId, receiversId });
    return response.data;
}

export const getReceivedInvitationsApi = async () => {
    const response = await api.get('/received');
    return response.data;
}

export const getSentInvitationsApi = async () => {
    const response = await api.get('/sent');
    return response.data;
}

export const respondToInvitationApi = async (invitationId, status) => {
    const response = await api.patch(`/${invitationId}`, { status });
    return response.data;
}
