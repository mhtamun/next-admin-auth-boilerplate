import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'apiCall',
    initialState: {
        isFinished: true,
        progressPercent: 0,
    },
    reducers: {
        start: (state) => {
            state.isFinished = false;
            state.progressPercent = 0;
        },
        incrementProgress: (state, action) => {
            state.progressPercent += action.payload;
        },
        finish: (state) => {
            state.isFinished = true;
            state.progressPercent = 100;
        },
    },
});

export const { start, incrementProgress, finish } = sidebarSlice.actions;

export default sidebarSlice.reducer;
