export const SET_VALUE = "SET_VALUE"
export const RESET_VALUE = "RESET_VALUE"

export default [
    {
        on: SET_VALUE,
        reduce: (state, payload) => {
            state.value = payload.value
        },
    },
    {
        on: RESET_VALUE,
        reduce: (state, payload) => {
            state.value = ""
        }
    }
]
