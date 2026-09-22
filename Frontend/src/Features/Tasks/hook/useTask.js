import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createTaskApi, getTasksApi, getTaskApi, updateTaskApi, updateTaskStatusApi, deleteTaskApi } from '../service/taskApi.js';
import { addTask, removeTask, setAssignee, setDescription, setDueDate, setPriority, setProjectId, setStatus, setTasks, setTitle, updateTaskInList } from '../state/taskSlice.js';

const useTask = () => {
	const dispatch = useDispatch();

	const updateTaskState = useCallback((task) => {
		if (!task) return;

		dispatch(setAssignee(task.assignee));
		dispatch(setTitle(task.title));
		dispatch(setDescription(task.description));
		dispatch(setProjectId(task.projectId));
		dispatch(setStatus(task.status));
		dispatch(setPriority(task.priority));
		dispatch(setDueDate(task.dueDate));
	}, [dispatch]);

	const createTask = useCallback(async (title, description, projectId, status, priority, assignee, dueDate) => {
		const response = await createTaskApi(title, description, projectId, status, priority, assignee, dueDate);
		dispatch(addTask(response.task));
		updateTaskState(response.task);
		return response.task;
	}, [dispatch, updateTaskState]);

	const getTasks = useCallback(async () => {
		const response = await getTasksApi();
		dispatch(setTasks(response.tasks ?? []));
	}, [dispatch]);

	const getTask = useCallback(async (taskId) => {
		const response = await getTaskApi(taskId);
		updateTaskState(response.task);
	}, [updateTaskState]);

	const updateTask = useCallback(async (taskId, data) => {
		const response = await updateTaskApi(taskId, data);
		dispatch(updateTaskInList(response.task));
		updateTaskState(response.task);
		return response.task;
	}, [dispatch, updateTaskState]);

	const updateTaskStatus = useCallback(async (taskId, status) => {
		const response = await updateTaskStatusApi(taskId, status);
		dispatch(updateTaskInList(response.task));
		updateTaskState(response.task);
		return response.task;
	}, [dispatch, updateTaskState]);

	const deleteTask = useCallback(async (taskId) => {
		await deleteTaskApi(taskId);
		dispatch(removeTask(taskId));
	}, [dispatch]);

	return { createTask, getTasks, getTask, updateTask, updateTaskStatus, deleteTask }
}

export default useTask
