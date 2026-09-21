import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { registerApi, loginApi, getMeApi } from '../Service/authApi.js';
import { setEmail, setFullName, setRole } from '../../Dashboard/state/authSlice.js';

const useAuth = () => {
    const dispatch = useDispatch();

    const storeUser = useCallback((user) => {
        dispatch(setFullName(user.fullName));
        dispatch(setEmail(user.email));
        dispatch(setRole(user.role));
    }, [dispatch]);

    const registerHandler = async ({ fullName, email, password, role }) => {
        const response = await registerApi(fullName.trim(), email.trim().toLowerCase(), password, role);
        storeUser(response.user);
        return response;
    }

    const loginHandler = async ({ email, password }) => {
        const response = await loginApi(email.trim().toLowerCase(), password);
        storeUser(response.user);
        return response;
    }

    const getMeHandler = useCallback(async () => {
        const response = await getMeApi();
        storeUser(response.user);
        return response;
    }, [storeUser]);

    return { registerHandler, loginHandler, getMeHandler }
}

export default useAuth
