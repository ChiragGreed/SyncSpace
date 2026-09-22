import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        fullName: null,
        email: null,
        role: null
    },
    reducers: {
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        logout: (state) => {
            state.fullName = null;
            state.email = null;
            state.role = null;
        }
    }
})

export const { setFullName, setEmail, setRole, logout } = authSlice.actions;
export default authSlice.reducer; 