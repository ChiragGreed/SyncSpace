import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {createTaskApi,getTasksApi,getTaskApi,updateTaskApi,updateTaskStatusApi,deleteTaskApi} from '../service/taskApi.js';
import { removeTask, setAssignee, setDescription, setPriority, setProjectId, setStatus, setTasks, setTitle } from '../state/taskSlice.js';

const useTask = () => {
	const dispatch = useDispatch();

	const updateTaskState = (task) => {
		if (!task) return;

		dispatch(setAssignee(task.assignee));
		dispatch(setTitle(task.title));
		dispatch(setDescription(task.description));
		dispatch(setProjectId(task.projectId));
		dispatch(setStatus(task.status));
		dispatch(setPriority(task.priority));
	}

	const createTask = async (title, description, projectId, status, priority, assignee) => {
		const response = await createTaskApi(title, description, projectId, status, priority, assignee);
		updateTaskState(response.task);
		console.log("useTask: createTask")
	}

	const getTasks = useCallback(async () => {
		const response = await getTasksApi();
		dispatch(setTasks(response.tasks ?? []));
		console.log(response);
	}, [dispatch]);

	const getTask = async (taskId) => {
		const response = await getTaskApi(taskId);
		updateTaskState(response.task);
		console.log("useTask: getTask")
	}

	const updateTask = async (taskId, data) => {
		const response = await updateTaskApi(taskId, data);
		updateTaskState(response.task);
		console.log("useTask: updateTask")
	}

	const updateTaskStatus = async (taskId, status) => {
		const response = await updateTaskStatusApi(taskId, status);
		updateTaskState(response.task);
		console.log("useTask: updateTaskStatus")
	}

	const deleteTask = async (taskId) => {
		await deleteTaskApi(taskId);
		dispatch(removeTask(taskId));
		console.log("useTask: deleteTask")
	}

	return { createTask, getTasks, getTask, updateTask, updateTaskStatus, deleteTask }
}

export default useTask
