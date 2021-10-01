import {createSlice} from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        success: null,
        warning: null,
        error: null,
    },
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload
        },
        delSuccess: (state) => {
            state.success = null
        },
        setWarning: (state, action) => {
            state.warning = action.payload
        },
        delWarning: (state) => {
            state.warning = null
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        delError: (state) => {
            state.error = null
        },
    }
})

export const {setSuccess, delSuccess, setWarning, delWarning, setError, delError} = alertsSlice.actions
export default alertsSlice.reducer
