import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { registerApi, loginApi, getMeApi } from '../Service/authApi.js';
import { setEmail, setFullName, setRole } from '../state/authSlice.js'

const useAuth = () => {
    const dispatch = useDispatch();

    const storeUser = useCallback((user) => {
        dispatch(setFullName(user.fullName));
        dispatch(setEmail(user.email));
        dispatch(setRole(user.role));
    }, [dispatch]);

    const register = async ({ fullName, email, password, role }) => {
        const response = await registerApi(fullName.trim(), email.trim().toLowerCase(), password, role);
        storeUser(response.user);
        return response;
    }

    const login = async ({ email, password }) => {
        const response = await loginApi(email.trim().toLowerCase(), password);
        storeUser(response.user);
        return response;
    }

    const getMe = useCallback(async () => {
        const response = await getMeApi();
        storeUser(response.user);
        return response;
    }, [storeUser]);

    return { register, login, getMe }
}

export default useAuth
