import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        messages: messagesReducer,
    },
})
