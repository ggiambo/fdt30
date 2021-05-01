import {createSlice} from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        success: null,
        warning: null,
        danger: null,
    },
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        delSuccess: (state) => {
            state.success = null;
        },
        setWarning: (state, action) => {
            state.warning = action.payload;
        },
        delWarning: (state) => {
            state.success = null;
        },
        setDanger: (state, action) => {
            state.success = action.payload;
        },
        delDanger: (state) => {
            state.success = null;
        },
    }
});

export const {setSuccess, delSuccess, setWarning, delWarning, setDanger, delDanger} = messagesSlice.actions
export default messagesSlice.reducer
