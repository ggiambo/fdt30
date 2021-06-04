import {createSlice} from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        subject: "",
        markDown: "",
    },
    reducers: {
        setSubject: (state, action) => {
            state.subject = action.payload;
        },
        setMarkdown: (state, action) => {
            state.markDown = action.payload;
        },
    },
});

export const {setSubject, setMarkdown} = messageSlice.actions
export default messageSlice.reducer
