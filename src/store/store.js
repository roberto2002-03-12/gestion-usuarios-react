import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //vere como afecta la fecha, por el momento no tocar
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});