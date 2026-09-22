import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notifications: [],
		userId: null,
		message: null,
		isRead: false,
		createdAt: null,
		updatedAt: null
	},
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setIsRead: (state, action) => {
			state.isRead = action.payload;
		},
		setCreatedAt: (state, action) => {
			state.createdAt = action.payload;
		},
		setUpdatedAt: (state, action) => {
			state.updatedAt = action.payload;
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		markAllRead: (state) => {
			state.notifications.forEach((notification) => {
				notification.isRead = true;
			});
		},
		markRead: (state, action) => {
			const notification = state.notifications.find((item) => item._id === action.payload);
			if (notification) notification.isRead = true;
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter((notification) => notification._id !== action.payload);
		}
	}
})

export const { setUserId, setMessage, setIsRead, setCreatedAt, setUpdatedAt, setNotifications, markAllRead, markRead, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
