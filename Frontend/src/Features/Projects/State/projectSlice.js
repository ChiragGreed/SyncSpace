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
		removeProject: (state, action) => {
			state.projects = state.projects.filter((project) => project._id !== action.payload);
		}
	}
})

export const { setAdmin, setTitle, setDescription, setStatus, setMembers, setDueDate, setProjects, setProjectTasks, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
