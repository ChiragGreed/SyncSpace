import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getMeApi, loginApi, registerApi } from '../../Authentication/Service/authApi.js';
import { setEmail, setFullName, setRole } from '../state/authSlice.js';


const useAuth = () => {

    const dispatch = useDispatch();

    const register = async (fullName, email, password, role) => {
        const response = await registerApi(fullName, email, password, role);

        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setRole(response.user.role));
    }

    const login = async (email, password) => {
        const response = await loginApi(email, password);

        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setRole(response.user.role));

    }

    const getMe = useCallback(async () => {
        const response = await getMeApi();
        
        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setRole(response.user.role));
    }, [dispatch]);

    return { register, login, getMe }
}

export default useAuth