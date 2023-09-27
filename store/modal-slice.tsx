import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isVisible: boolean;
}

const initialModalState: ModalState = {
    isVisible: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        toggleVisibility (state) {
            state.isVisible = !state.isVisible;
        }
    }
})


export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;