import { createSlice } from '@reduxjs/toolkit';

interface userId {
    id: string;
}

const initialUserIdState: userId = {
    id: ''
}

const userIdSlice = createSlice({
    name: 'userId',
    initialState: initialUserIdState,
    reducers: {
        setUserId (state, action) {
            state.id = action.payload;
        }
    }
})


export const { setUserId } = userIdSlice.actions;
export const userIdReducer = userIdSlice.reducer;