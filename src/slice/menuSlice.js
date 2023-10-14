import { MENU_ITEMS } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
// actions performed for menu container will be stored here.


const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuItemClick: (state, action) => {
            // onclick update activeMenuItem 
            state.activeMenuItem = action.payload
        },
        actionItemClick: (state, action) => {
            // onclick update actionMenuItem 
            state.actionMenuItem = action.payload;
        }
    }
});

export const { menuItemClick, actionItemClick } = menuSlice.actions;

export default menuSlice.reducer;

// 2states are there
// visual states -- pencil, Eraser
// actionable states -- undo, save
