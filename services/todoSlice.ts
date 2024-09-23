import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostsState, PostPayload } from '../interface/index';

const endPoint = "https://jsonplaceholder.typicode.com";

export const getPostsAPI = createAsyncThunk<Post[], void>(
    'posts/getPosts',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return await response.json();
    }
);

export const postAPI = createAsyncThunk<Post, PostPayload>('posts/postPost', async (payload) => {
    const response = await fetch(`${endPoint}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return response.json();
});

export const putAPI = createAsyncThunk<Post, PostPayload>('posts/putPost', async (payload) => {
    const response = await fetch(`${endPoint}/todos/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return response.json();
});

export const deletePostAPI = createAsyncThunk<number, number>(
    'posts/deletePost',
    async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });
        return id;
    }
);

const initialState: PostsState = {
    posts: [] as Post[],
        loading: false,
        error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostsAPI.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(getPostsAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(postAPI.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(putAPI.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post: PostPayload) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePostAPI.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

export const postsReducer = postsSlice.reducer;
