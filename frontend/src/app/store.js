import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertsReducer from './alertsSlice'
import messageSlice from './messageSlice'
import {messagesApi, userApi} from "./api";

export default configureStore({
    reducer: {
        [messagesApi.reducerPath]: messagesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer,
        alerts: alertsReducer,
        message: messageSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(messagesApi.middleware)
        .concat(userApi.middleware),
})
