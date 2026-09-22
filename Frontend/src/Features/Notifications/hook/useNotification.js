import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
	getNotificationsApi,
	markNotificationReadApi,
	markAllNotificationsReadApi,
	deleteNotificationApi
} from '../service/notificationApi.js';
import { markAllRead, markRead, removeNotification, setCreatedAt, setIsRead, setMessage, setNotifications, setUpdatedAt, setUserId } from '../state/notificationSlice.js';

const useNotification = () => {
	const dispatch = useDispatch();

	const updateNotificationState = useCallback((notification) => {
		if (!notification) return;

		dispatch(setUserId(notification.userId));
		dispatch(setMessage(notification.message));
		dispatch(setIsRead(notification.isRead));
		dispatch(setCreatedAt(notification.createdAt));
		dispatch(setUpdatedAt(notification.updatedAt));
	}, [dispatch]);

	const getNotifications = useCallback(async () => {
		const response = await getNotificationsApi();
		dispatch(setNotifications(response.notifications ?? []));
		updateNotificationState(response.notifications?.[0]);
	}, [dispatch, updateNotificationState]);

	const markNotificationRead = useCallback(async (notificationId) => {
		const response = await markNotificationReadApi(notificationId);
		dispatch(markRead(notificationId));
		updateNotificationState(response.notification);
	}, [dispatch, updateNotificationState]);

	const markAllNotificationsRead = useCallback(async () => {
		await markAllNotificationsReadApi();
		dispatch(markAllRead());
	}, [dispatch]);

	const deleteNotification = useCallback(async (notificationId) => {
		await deleteNotificationApi(notificationId);
		dispatch(removeNotification(notificationId));
	}, [dispatch]);

	return { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification }
}

export default useNotification
