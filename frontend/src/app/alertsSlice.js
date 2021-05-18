import {createSlice} from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
    name: 'alerts',
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
            state.warning = null;
        },
        setDanger: (state, action) => {
            state.danger = action.payload;
        },
        delDanger: (state) => {
            state.danger = null;
        },
    }
});

export const {setSuccess, delSuccess, setWarning, delWarning, setDanger, delDanger} = alertsSlice.actions
export default alertsSlice.reducer
