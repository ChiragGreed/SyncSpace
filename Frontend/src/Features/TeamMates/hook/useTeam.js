import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getRecentTeammatesApi, searchUsersApi } from '../service/teamApi.js';
import { setRecentTeammates, setUsers } from '../../TeamMates/state/teamSlice.js';

const useTeam = () => {
    const dispatch = useDispatch();

    const searchUsers = useCallback(async (search = '') => {
        const response = await searchUsersApi(search);
        dispatch(setUsers(response.users ?? []));
        return response.users ?? [];
    }, [dispatch]);

    const getRecentTeammates = useCallback(async () => {
        const response = await getRecentTeammatesApi();
        // The API omits `users` entirely when there are no recent teammates
        // yet (a common case for new accounts), so this must be optional.
        const recentTeammates = response.users?.recentTeamMates || [];

        dispatch(setRecentTeammates(recentTeammates));
        return recentTeammates;
    }, [dispatch]);

    return { searchUsers, searchUser: searchUsers, getRecentTeammates };
};

export default useTeam;