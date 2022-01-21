/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => action.payload,
        reset: (state) => initialState,
    },
});

export const { reset, set } = userSlice.actions;

export default userSlice.reducer;
