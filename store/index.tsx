import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modal-slice';
import { userIdReducer } from './userId-slice';
import { logsReducer } from './userLogs-slice';
import { mobileMenuReducer } from './mobile-menu';

const store = configureStore({
    reducer: { 
        modal: modalReducer, 
        userId: userIdReducer, 
        userLogs: logsReducer ,
        mobileMenu: mobileMenuReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export default store;