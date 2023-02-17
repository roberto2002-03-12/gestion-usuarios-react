import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //authenticated, not-authenticated
        user: {},
        errorMessage: undefined,
        registerMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLoggin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.registerMessage = undefined;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onRegister: (state, {payload}) => {
            state.status = 'not-authenticated',
            state.user = {};
            state.errorMessage = undefined;
            state.registerMessage = payload;
        }
    }
});

export const {
    onChecking,
    onLoggin,
    onLogout,
    clearErrorMessage,
    onRegister
} = authSlice.actions;