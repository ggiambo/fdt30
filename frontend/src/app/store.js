import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import alertsReducer from './alertsSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        alerts: alertsReducer,
        messages: messagesSlice,
    },
})
