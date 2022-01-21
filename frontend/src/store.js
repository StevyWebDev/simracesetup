/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import listSlice from './slice/listSlice';
import userSlice from './slice/userSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        list: listSlice,
    },
});
