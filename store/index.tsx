import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modal-slice';
import { userIdReducer } from './userId-slice';
import { favoritesReducer } from './favorites-slice';

const store = configureStore({
    reducer: { modal: modalReducer, userId: userIdReducer, favorites: favoritesReducer }
});

export type RootState = ReturnType<typeof store.getState>
export default store;