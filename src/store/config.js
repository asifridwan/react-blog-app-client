import { configureStore } from '@reduxjs/toolkit';
import postReducer from './posts';
import detailReducer from './details';
import commentReducer from './comments';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        details: detailReducer,
        comments: commentReducer
    }
});