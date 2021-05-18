import {createSlice} from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        totalPages: 0,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
    },
});

export const {setMessages, setTotalPages} = messagesSlice.actions
export default messagesSlice.reducer
