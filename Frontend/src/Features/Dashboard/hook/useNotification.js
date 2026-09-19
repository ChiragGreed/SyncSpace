import { useDispatch } from 'react-redux';
import {
	getNotificationsApi,
	markNotificationReadApi,
	markAllNotificationsReadApi,
	deleteNotificationApi
} from '../service/notificationApi.js';
import { markAllRead, removeNotification, setCreatedAt, setIsRead, setMessage, setNotifications, setUpdatedAt, setUserId } from '../state/notificationSlice.js';

const useNotification = () => {
	const dispatch = useDispatch();

	const updateNotificationState = (notification) => {
		if (!notification) return;

		dispatch(setUserId(notification.userId));
		dispatch(setMessage(notification.message));
		dispatch(setIsRead(notification.isRead));
		dispatch(setCreatedAt(notification.createdAt));
		dispatch(setUpdatedAt(notification.updatedAt));
	}

	const getNotifications = async () => {
		const response = await getNotificationsApi();
		dispatch(setNotifications(response.notifications ?? []));
		updateNotificationState(response.notifications?.[0]);
		console.log("useNotification: getNotifications")
	}

	const markNotificationRead = async (notificationId) => {
		const response = await markNotificationReadApi(notificationId);
		updateNotificationState(response.notification);
		console.log("useNotification: markNotificationRead")
	}

	const markAllNotificationsRead = async () => {
		await markAllNotificationsReadApi();
		dispatch(markAllRead());
		console.log("useNotification: markAllNotificationsRead")
	}

	const deleteNotification = async (notificationId) => {
		await deleteNotificationApi(notificationId);
		dispatch(removeNotification(notificationId));
		console.log("useNotification: deleteNotification")
	}

	return { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification }
}

export default useNotification
