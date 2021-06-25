import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertsReducer from './alertsSlice'
import {messagesApi, userApi} from "./api";

export default configureStore({
    reducer: {
        [messagesApi.reducerPath]: messagesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer,
        alerts: alertsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(messagesApi.middleware)
        .concat(userApi.middleware),
})
