import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MobileMenuState {
    isOpen: boolean;
}

const initialMenuState: MobileMenuState = {
    isOpen: false
}

const mobileMenuSlice = createSlice({
    name: 'mobile-menu',
    initialState: initialMenuState,
    reducers: {
        toggleMenuVisibility (state) {
            state.isOpen = !state.isOpen;
        }
    }
})


export const mobileMenuActions = mobileMenuSlice.actions;
export const mobileMenuReducer = mobileMenuSlice.reducer;