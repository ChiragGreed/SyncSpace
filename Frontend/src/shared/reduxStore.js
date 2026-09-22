import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../Features/Authentication/state/authSlice.js';
import invitationReducers from '../Features/Invitations/state/invitationSlice.js';
import notificationReducers from '../Features/Notifications/state/notificationSlice.js';
import projectReducers from '../Features/Projects/state/projectSlice.js';
import taskReducers from '../Features/Tasks/state/taskSlice.js';
import teamReducers from '../Features/TeamMates/state/teamSlice.js';

const reduxStore = configureStore({
    reducer: {
        user: authReducers,
        invitation: invitationReducers,
        notification: notificationReducers,
        project: projectReducers,
        task: taskReducers,
        team: teamReducers
    }
})

export default reduxStore
