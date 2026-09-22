import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		projects: [],
		projectTasks: [],
		admin: null,
		title: null,
		description: null,
		status: null,
		members: [],
		dueDate: null
	},
	reducers: {
		setAdmin: (state, action) => {
			state.admin = action.payload;
		},
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setDescription: (state, action) => {
			state.description = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setMembers: (state, action) => {
			state.members = action.payload;
		},
		setDueDate: (state, action) => {
			state.dueDate = action.payload;
		},
		setProjects: (state, action) => {
			state.projects = action.payload;
		},
		setProjectTasks: (state, action) => {
			state.projectTasks = action.payload;
		},
		// Inserts a freshly created project at the top of the list so the
		// Dashboard updates instantly without a refetch.
		addProject: (state, action) => {
			state.projects = [action.payload, ...state.projects];
		},
		// Keeps the list in sync after an in-place edit/status change.
		updateProjectInList: (state, action) => {
			const updated = action.payload;
			state.projects = state.projects.map((project) => (project._id === updated._id ? updated : project));
		},
		removeProject: (state, action) => {
			state.projects = state.projects.filter((project) => project._id !== action.payload);
		}
	}
})

export const { setAdmin, setTitle, setDescription, setStatus, setMembers, setDueDate, setProjects, setProjectTasks, addProject, updateProjectInList, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
