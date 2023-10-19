import { createSlice } from '@reduxjs/toolkit';

interface VotingLogItem {
    id: string;
    action: 'add' | 'remove';
    category: string;
}

interface LogsState {
    votingLog: VotingLogItem[];
    favoritesLog: VotingLogItem[];
}


const initialVotingLogState: LogsState = {
    votingLog: [],
    favoritesLog: []
}

const logsSlice = createSlice({
    name: 'userActions',
    initialState: initialVotingLogState,
    reducers: {
        addToVotingLog (state, action) {
            state.votingLog.push(action.payload);
        }, 
        addToFavotitesLog (state, action) {
            state.favoritesLog.push(action.payload);
        },
    }
})


export const logsActions = logsSlice.actions;
export const logsReducer = logsSlice.reducer;