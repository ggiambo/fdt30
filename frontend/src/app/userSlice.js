import {createSlice} from '@reduxjs/toolkit'
import {getUserNameFromLocalStorage} from './utils'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: getUserNameFromLocalStorage() != null,
        name: getUserNameFromLocalStorage(),
    },
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.name = action.payload
        },
        logout: (state) => {
            state.logged = false
            state.name = null
        },
    },
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer
