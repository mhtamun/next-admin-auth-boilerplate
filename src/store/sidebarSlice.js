import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        show: true,
        unfoldable: false,
    },
    reducers: {
        showOff: (state) => {
            state.show = false;
        },
        showOn: (state) => {
            state.show = true;
        },
        foldOff: (state) => {
            state.unfoldable = true;
        },
        foldOn: (state) => {
            state.unfoldable = false;
        },
    },
});

export const { showOff, showOn, foldOff, foldOn } = sidebarSlice.actions;

export const selectSidebarShow = (state) => state.sidebar.show;
export const selectSidebarUnfoldable = (state) => state.sidebar.unfoldable;

export default sidebarSlice.reducer;
