import {createSlice} from '@reduxjs/toolkit'

const getUserMameFromLocalStorage = () => {
    const token = localStorage.getItem("token")
    if (token == null) {
        return null
    }
    const username = token.split(".")[1]
    const content = JSON.parse(atob(username))
    return content.sub
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: getUserMameFromLocalStorage() != null,
        name: getUserMameFromLocalStorage(),
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
