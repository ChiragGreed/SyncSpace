import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createProjectApi, getProjectsApi, getProjectApi, getProjectTasksApi, updateProjectApi, updateProjectStatusApi, deleteProjectApi } from '../service/projectApi.js';
import { addProject, removeProject, setAdmin, setDescription, setDueDate, setMembers, setProjectTasks, setProjects, setStatus, setTitle, updateProjectInList } from '../state/projectSlice.js';

const useProject = () => {
	const dispatch = useDispatch();

	const updateProjectState = useCallback((project) => {
		if (!project) return;

		dispatch(setAdmin(project.admin));
		dispatch(setTitle(project.title));
		dispatch(setDescription(project.description));
		dispatch(setStatus(project.status));
		dispatch(setMembers(project.members));
		dispatch(setDueDate(project.dueDate));
	}, [dispatch]);

	const createProject = useCallback(async (title, description, status, dueDate, members) => {
		const response = await createProjectApi(title, description, status, dueDate, members);
		dispatch(addProject(response.project));
		updateProjectState(response.project);
		return response.project;
	}, [dispatch, updateProjectState]);

	const getProjects = useCallback(async () => {
		const response = await getProjectsApi();
		dispatch(setProjects(response.projects ?? []));
	}, [dispatch]);

	const getProject = useCallback(async (projectId) => {
		const response = await getProjectApi(projectId);
		updateProjectState(response.project);
		dispatch(setProjectTasks(response.tasks ?? []));
	}, [dispatch, updateProjectState]);

	const getProjectTasks = useCallback(async (projectId) => {
		const response = await getProjectTasksApi(projectId);
		dispatch(setProjectTasks(response.tasks ?? []));
		return response.tasks ?? [];
	}, [dispatch]);

	const updateProject = useCallback(async (projectId, data) => {
		const response = await updateProjectApi(projectId, data);
		dispatch(updateProjectInList(response.project));
		updateProjectState(response.project);
		return response.project;
	}, [dispatch, updateProjectState]);

	const updateProjectStatus = useCallback(async (projectId, status) => {
		const response = await updateProjectStatusApi(projectId, status);
		dispatch(updateProjectInList(response.project));
		updateProjectState(response.project);
		return response.project;
	}, [dispatch, updateProjectState]);

	const deleteProject = useCallback(async (projectId) => {
		await deleteProjectApi(projectId);
		dispatch(removeProject(projectId));
	}, [dispatch]);

	return { createProject, getProjects, getProject, getProjectTasks, updateProject, updateProjectStatus, deleteProject }
}

export default useProject
