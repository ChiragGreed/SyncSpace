import { createSlice } from "@reduxjs/toolkit";

const invitationSlice = createSlice({
	name: "invitation",
	initialState: {
		createdInvitations: [],
		skippedInvitations: [],
		receivedInvitations: [],
		sentInvitations: [],
		projectId: null,
		senderId: null,
		receiverId: null,
		status: null
	},
	reducers: {
		setProjectId: (state, action) => {
			state.projectId = action.payload;
		},
		setSenderId: (state, action) => {
			state.senderId = action.payload;
		},
		setReceiverId: (state, action) => {
			state.receiverId = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setCreatedInvitations: (state, action) => {
			state.createdInvitations = action.payload;
		},
		setSkippedInvitations: (state, action) => {
			state.skippedInvitations = action.payload;
		},
		setReceivedInvitations: (state, action) => {
			state.receivedInvitations = action.payload;
		},
		setSentInvitations: (state, action) => {
			state.sentInvitations = action.payload;
		}
	}
})

export const { setProjectId, setSenderId, setReceiverId, setStatus, setCreatedInvitations, setSkippedInvitations, setReceivedInvitations, setSentInvitations } = invitationSlice.actions;
export default invitationSlice.reducer;
