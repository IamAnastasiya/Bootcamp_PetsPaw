import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Breed from '../models/Breed';

// const initialBreedsState: {info: Breed[], breedsIds: string[], breedsNames: string[]} = {
//     info: [],
//     breedsIds: [],
//     breedsNames: []
// };

// const BreedsSlice = createSlice({
//     name: 'breeds',
//     initialState: initialBreedsState,
//     reducers: {
//         setBreeds (state, action: PayloadAction<Breed[]>) {
//             state.info = action.payload;
//         },
//         getBreedsIds (state) {
//             state.breedsIds = state.info.map(item => item.id);
//         },
//         getBreedsNames (state) {
//             state.breedsNames = state.info.map(item => item.name);
//         }
//     }
// })

const initialBreedsState: Breed[] = [];
    
    const BreedsSlice = createSlice({
        name: 'breeds',
        initialState: initialBreedsState,
        reducers: {
            setBreeds (state, action: PayloadAction<Breed[]>) {
                state = action.payload;
            },
            // getBreedsIds (state) {
            //     state.breedsIds = state.info.map(item => item.id);
            // },
            // getBreedsNames (state) {
            //     state.breedsNames = state.info.map(item => item.name);
            // }
        }
    })


export const breedsActions = BreedsSlice.actions;
export const breedsReducer = BreedsSlice.reducer;