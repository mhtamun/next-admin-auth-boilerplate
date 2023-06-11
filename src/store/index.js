import { configureStore } from '@reduxjs/toolkit';
import sidebarSliceReducer from './sidebarSlice';

export const store = configureStore({
    reducer: { sidebar: sidebarSliceReducer },
});
