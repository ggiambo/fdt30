import {createSlice} from '@reduxjs/toolkit'

export const threadSlice = createSlice({
    name: 'thread',
    initialState: {
        messages: []
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const {setMessages} = threadSlice.actions
export default threadSlice.reducer
