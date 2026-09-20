import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
    name: 'team',
    initialState: {
        users: [],
        recentTeammates: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setRecentTeammates: (state, action) => {
            state.recentTeammates = action.payload;
        }
    }
});

export const { setUsers, setRecentTeammates } = teamSlice.actions;
export default teamSlice.reducer;