import { createSlice } from '@reduxjs/toolkit';

const initialUserIdState:string = '';


const userIdSlice = createSlice({
    name: 'userId',
    initialState: initialUserIdState,
    reducers: {
        setUserId (state, action) {
            return action.payload; 
        }
    }
})


export const { setUserId } = userIdSlice.actions;
export const userIdReducer = userIdSlice.reducer;