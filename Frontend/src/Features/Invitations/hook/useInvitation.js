import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
	createInvitationApi,
	getReceivedInvitationsApi,
	getSentInvitationsApi,
	respondToInvitationApi
} from '../service/invitationApi.js';
import { setCreatedInvitations, setProjectId, setReceivedInvitations, setReceiverId, setSenderId, setSentInvitations, setSkippedInvitations, setStatus } from '../state/invitationSlice.js';

const useInvitation = () => {
	const dispatch = useDispatch();

	const updateInvitationState = useCallback((invitation) => {
		if (!invitation) return;

		dispatch(setProjectId(invitation.projectId));
		dispatch(setSenderId(invitation.senderId));
		dispatch(setReceiverId(invitation.receiverId));
		dispatch(setStatus(invitation.status));
	}, [dispatch]);

	const createInvitation = useCallback(async (projectId, receiversId) => {
		const response = await createInvitationApi(projectId, receiversId);
		dispatch(setCreatedInvitations(response.created ?? []));
		dispatch(setSkippedInvitations(response.skipped ?? []));
		updateInvitationState(response.created?.[0]);
	}, [dispatch, updateInvitationState]);

	const getReceivedInvitations = useCallback(async () => {
		const response = await getReceivedInvitationsApi();
		dispatch(setReceivedInvitations(response.invitations ?? []));
	}, [dispatch]);

	const getSentInvitations = useCallback(async () => {
		const response = await getSentInvitationsApi();
		dispatch(setSentInvitations(response.invitations ?? []));
	}, [dispatch]);

	const respondToInvitation = useCallback(async (invitationId, status) => {
		const response = await respondToInvitationApi(invitationId, status);
		updateInvitationState(response.invitation);
	}, [updateInvitationState])

	return { createInvitation, getReceivedInvitations, getSentInvitations, respondToInvitation }
}

export default useInvitation
