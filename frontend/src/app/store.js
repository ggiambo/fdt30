import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertsReducer from './alertsSlice'
import messagesReducer from './messagesSlice'
import messageSlice from './messageSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        alerts: alertsReducer,
        messages: messagesReducer,
        message: messageSlice
    },
})
