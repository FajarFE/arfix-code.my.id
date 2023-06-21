import axios from "axios";
import {Category} from './api'
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";    

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (_, { getState }) => {
    try {
        const response = await Category.get("/", {
        });
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
});

export const addCategory = createAsyncThunk('category/addCategory', async (data, { getState }) => {
    const { token } = getState().auth;
    
    try {
        const response = await Category.post("/", data, {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (data, { getState }) => {
    const { token } = getState().auth;
    
    try {
        const response = await Category.put(`/${data.id}`, data, {
        headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { getState }) => {
    const { token } = getState().auth;
    
    try {
        const response = await Category.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: {
        [fetchCategory.pending]: (state) => {
            state.loading = true;
        }
        ,
        [fetchCategory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        }
        ,
        [fetchCategory.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
        ,
        [addCategory.pending]: (state) => {
            state.loading = true;
        }
        ,
        [addCategory.fulfilled]: (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
        }
        ,
        [addCategory.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
        ,
        [updateCategory.pending]: (state) => {
            state.loading = true;
        }
        ,
        [updateCategory.fulfilled]: (state, action) => {
            const updatedCategory = action.payload;
            const index = state.data.findIndex((item) => item.id === updatedCategory.id);
            if (index !== -1) {
              state.data[index] = updatedCategory;
            }
            state.loading = false;
          }
        ,
        [updateCategory.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
        ,
        [deleteCategory.pending]: (state) => {
            state.loading = true;
        }
        ,
        [deleteCategory.fulfilled]: (state, action) => {
            const deletedCategoryId = action.payload.id;
            state.data = state.data.filter((item) => item.id !== deletedCategoryId);
            state.loading = false;
          }
        ,
        [deleteCategory.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
        ,
    }
});

export const { clearState } = categorySlice.actions;
export default categorySlice.reducer;