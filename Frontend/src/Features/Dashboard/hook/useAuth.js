import { useDispatch } from 'react-redux';
import { getMeApi, loginApi, registerApi } from '../service/authApi.js';
import { setEmail, setFullName, setPassword, setRole } from '../state/authSlice.js';


const useAuth = () => {

    const dispatch = useDispatch();

    const register = async (fullName, email, password, role) => {
        const response = await registerApi(fullName, email, password, role);

        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setPassword(response.user.password));
        dispatch(setRole(response.user.role));
    }

    const login = async (email, password) => {
        const response = await loginApi(email, password);

        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setPassword(response.user.password));
        dispatch(setRole(response.user.role));

    }

    const getMe = async () => {
        const response = await getMeApi();

        dispatch(setFullName(response.user.fullName));
        dispatch(setEmail(response.user.email));
        dispatch(setPassword(response.user.password));
        dispatch(setRole(response.user.role));
    }

    return { register, login, getMe }
}

export default useAuth