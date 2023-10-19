import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Image from '../models/Image';

const initialFavoritesState: Image[] = [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialFavoritesState,
    reducers: {
        addToFavorites (state, action: PayloadAction<Image[]>) {
            const favorites = action.payload.map((item) => ({
                id: item.id, 
                image_id: item.image_id,
                image: {url: item.image.url}
              }));
            state.push(...favorites);
        },
        removeFromFavorites (state, action: PayloadAction<string>) {
            state = state.filter(image => image.image_id !== action.payload);
        }
    }
})


export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;