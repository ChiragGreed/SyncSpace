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
		// Inserts a freshly created task at the top of the list so the UI
		// (Dashboard, task lists) updates instantly without a refetch.
		addTask: (state, action) => {
			state.tasks = [action.payload, ...state.tasks];
		},
		// Keeps the list in sync after an in-place edit/status change,
		// again avoiding a full getTasks() round trip.
		updateTaskInList: (state, action) => {
			const updated = action.payload;
			state.tasks = state.tasks.map((task) => (task._id === updated._id ? updated : task));
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task._id !== action.payload);
		}
	}
})

export const { setAssignee, setTitle, setDescription, setProjectId, setStatus, setPriority, setDueDate, setTasks, addTask, updateTaskInList, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
