import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Headline } from './api';

export const fetchHeadlines = createAsyncThunk(
  'headlines/fetchHeadlines',
  async (params) => {
    try {
      const response = await Headline.get('/', { params });
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  },
);

const headlineSlice = createSlice({
  name: 'headlines',
  initialState: {
    data: [],
    loading: false,
    error: null,
    limit: 3,
    statusId: 2,
  },

  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: {
    [fetchHeadlines.pending]: (state) => {
      state.loading = true;
    },
    [fetchHeadlines.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchHeadlines.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const { setLimit } = headlineSlice.actions;

export default headlineSlice.reducer;
