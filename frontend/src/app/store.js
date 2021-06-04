import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import alertsReducer from './alertsSlice';
import messagesReducer from './messagesSlice';
import threadSlice from './threadSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        alerts: alertsReducer,
        messages: messagesReducer,
        thread: threadSlice,
    },
})
