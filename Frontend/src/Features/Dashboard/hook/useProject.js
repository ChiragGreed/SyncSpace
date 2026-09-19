import { useDispatch } from 'react-redux';
import { createProjectApi, getProjectsApi, getProjectApi, getProjectTasksApi, updateProjectApi, updateProjectStatusApi, deleteProjectApi } from '../service/projectApi.js';
import { removeProject, setAdmin, setDescription, setDueDate, setMembers, setProjectTasks, setProjects, setStatus, setTitle } from '../state/projectSlice.js';

const useProject = () => {
	const dispatch = useDispatch();

	const updateProjectState = (project) => {
		if (!project) return;

		dispatch(setAdmin(project.admin));
		dispatch(setTitle(project.title));
		dispatch(setDescription(project.description));
		dispatch(setStatus(project.status));
		dispatch(setMembers(project.members));
		dispatch(setDueDate(project.dueDate));
	}

	const createProject = async (title, description, status, dueDate) => {
		const response = await createProjectApi(title, description, status, dueDate);
		updateProjectState(response.project);
		console.log("useProject: createProject")
	}

	const getProjects = async () => {
		const response = await getProjectsApi();
		dispatch(setProjects(response.projects ?? []));
		console.log("useProject: getProjects")
	}

	const getProject = async (projectId) => {
		const response = await getProjectApi(projectId);
		updateProjectState(response.project);
		console.log("useProject: getProject")
	}

	const getProjectTasks = async (projectId) => {
		const response = await getProjectTasksApi(projectId);
		dispatch(setProjectTasks(response.tasks ?? []));
		console.log("useProject: getProjectTasks")
	}

	const updateProject = async (projectId, data) => {
		const response = await updateProjectApi(projectId, data);
		updateProjectState(response.project);
		console.log("useProject: updateProject")
	}

	const updateProjectStatus = async (projectId, status) => {
		const response = await updateProjectStatusApi(projectId, status);
		updateProjectState(response.project);
		console.log("useProject: updateProjectStatus")
	}

	const deleteProject = async (projectId) => {
		await deleteProjectApi(projectId);
		dispatch(removeProject(projectId));
		console.log("useProject: deleteProject")
	}

	return { createProject, getProjects, getProject, getProjectTasks, updateProject, updateProjectStatus, deleteProject }
}

export default useProject
