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

	const updateInvitationState = (invitation) => {
		if (!invitation) return;

		dispatch(setProjectId(invitation.projectId));
		dispatch(setSenderId(invitation.senderId));
		dispatch(setReceiverId(invitation.receiverId));
		dispatch(setStatus(invitation.status));
	}

	const createInvitation = async (projectId, receiversId) => {
		const response = await createInvitationApi(projectId, receiversId);
		dispatch(setCreatedInvitations(response.created ?? []));
		dispatch(setSkippedInvitations(response.skipped ?? []));
		updateInvitationState(response.created?.[0]);
		console.log("useInvitation: createInvitation")
	}

	const getReceivedInvitations = async () => {
		const response = await getReceivedInvitationsApi();
		dispatch(setReceivedInvitations(response.invitations ?? []));
		console.log("useInvitation: getReceivedInvitations")
	}

	const getSentInvitations = async () => {
		const response = await getSentInvitationsApi();
		dispatch(setSentInvitations(response.invitations ?? []));
		console.log("useInvitation: getSentInvitations")
	}

	const respondToInvitation = async (invitationId, status) => {
		const response = await respondToInvitationApi(invitationId, status);
		updateInvitationState(response.invitation);
		console.log("useInvitation: respondToInvitation")
	}

	return { createInvitation, getReceivedInvitations, getSentInvitations, respondToInvitation }
}

export default useInvitation
