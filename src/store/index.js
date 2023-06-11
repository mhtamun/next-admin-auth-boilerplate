import { configureStore } from '@reduxjs/toolkit';
import sidebarSliceReducer from './sidebarSlice';
import apiCallSliceReducer from './apiCallSlice';

export const store = configureStore({
    reducer: { sidebar: sidebarSliceReducer, apiCall: apiCallSliceReducer },
});
