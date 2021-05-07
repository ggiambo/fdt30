import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import alertsReducer from './alertsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        alerts: alertsReducer,
    },
})
