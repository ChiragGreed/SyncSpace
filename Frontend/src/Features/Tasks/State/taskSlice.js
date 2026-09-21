import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
	name: "task",
	initialState: {
		tasks: [],
		assignee: null,
		title: null,
		description: null,
		projectId: null,
		status: null,
		priority: null,
		dueDate: null
	},
	reducers: {
		setAssignee: (state, action) => {
			state.assignee = action.payload;
		},
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setDescription: (state, action) => {
			state.description = action.payload;
		},
		setProjectId: (state, action) => {
			state.projectId = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setPriority: (state, action) => {
			state.priority = action.payload;
		},
		setDueDate: (state, action) => {
			state.dueDate = action.payload;
		},
		setTasks: (state, action) => {
			state.tasks = action.payload;
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task._id !== action.payload);
		}
	}
})

export const { setAssignee, setTitle, setDescription, setProjectId, setStatus, setPriority, setDueDate, setTasks, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
