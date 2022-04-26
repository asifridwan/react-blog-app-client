import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    comments: [],
    loading: false
};

export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
    const response = await axios.get(`https://react-blog-app-api.herokuapp.com/comments/${id}`);
    return response.data;
});

const comments_slice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        resetComments: state => state = initialState
    },
    extraReducers: {
        [fetchComments.pending]: state => {
            state.loading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
        [fetchComments.rejected]: state => {
            state.loading = false;
        }
    }
});

export default comments_slice.reducer;
export const { resetComments } = comments_slice.actions;
export const selectComments = state => state.comments.comments;