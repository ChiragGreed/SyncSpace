import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        fullName: null,
        email: null,
        password: null,
        role: null
    },
    reducers: {
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setEmail: (action, state) => {
            state.email = action.payload;
        },
        setPassword: (action, state) => {
            state.password = action.payload;
        },
        setRole: (action, state) => {
            state.role = action.payload;
        }
    }
})

export const { setFullName, setEmail, setPassword, setRole } = authSlice.actions;
export default authSlice.reducer; 