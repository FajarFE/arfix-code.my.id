import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { posts } from './api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params) => {
  try {
    const response = await posts.get("/", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});


export const userPost = createAsyncThunk('posts/userPost', async (_, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await posts.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  try {
    const response = await posts.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (data, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await posts.post("/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (data, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await posts.put(`/${data.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: true,
    error: null,
    statusId: 2,
    currentPage: 1,
    totalPage: 0,
    createdAt: null,
    limit: 6,
  },
  reducers: {
    setStatusId: (state, action) => {
      state.statusId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: {
   
    [fetchPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchPostById.pending]: (state) => {
      state.loading = true;
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.loading = false;
      // Process the retrieved post by ID
      const post = action.payload;
      // Update the state with the obtained post
      state.currentPost = post;
    },
    [fetchPostById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addPost.pending]: (state) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const updatedIndex = state.data.findIndex((post) => post.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = action.payload;
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setLimit, setCreatedAt, setLoading, setData, setTotalPage, setStatusId, setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;
