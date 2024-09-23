import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './todoSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});
