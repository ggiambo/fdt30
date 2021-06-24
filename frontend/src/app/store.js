import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertsReducer from './alertsSlice'
import messageSlice from './messageSlice'
import {messagesApi} from "./api";

export default configureStore({
    reducer: {
        [messagesApi.reducerPath]: messagesApi.reducer,
        user: userReducer,
        alerts: alertsReducer,
        message: messageSlice
    },
    middleware: (getDefaultMiddleware) =>    getDefaultMiddleware().concat(messagesApi.middleware),
})
