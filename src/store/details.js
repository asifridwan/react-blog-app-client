import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    details: [],
    loading: false
};

export const fetchDetails = createAsyncThunk('posts/fetchDetails', async (id) => {
    const response = await axios.get(`https://react-blog-app-api.herokuapp.com/details/${id}`);
    return response.data;
});

const details_slice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        resetDetails: state => state = initialState
    },
    extraReducers: {
        [fetchDetails.pending]: state => {
            state.loading = true;
        },
        [fetchDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.details = action.payload;
        },
        [fetchDetails.rejected]: state => {
            state.loading = false;
        }
    }
});

export default details_slice.reducer;
export const { resetDetails } = details_slice.actions;
export const selectDetails = state => state.details.details;