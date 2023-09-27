import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    images: {favId: string, imageId: string}[]
}

const initialFavoritesState: FavoritesState = {
    images: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialFavoritesState,
    reducers: {
        addToFavorites (state, action: PayloadAction<{favId: string, imageId: string}>) {
            state.images.push(action.payload);
        },
        removeFromFavorites (state, action: PayloadAction<string>) {
            state.images = state.images.filter(image => image.imageId !== action.payload);
        }
    }
})


export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;