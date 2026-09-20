import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../Features/Dashboard/state/authSlice.js';
import invitationReducers from '../Features/Dashboard/state/invitationSlice.js';
import notificationReducers from '../Features/Dashboard/state/notificationSlice.js';
import projectReducers from '../Features/Dashboard/state/projectSlice.js';
import taskReducers from '../Features/Dashboard/state/taskSlice.js';

const reduxStore = configureStore({
    reducer: {
        user: authReducers,
        invitation: invitationReducers,
        notification: notificationReducers,
        project: projectReducers,
        task: taskReducers
    }
})

export default reduxStore