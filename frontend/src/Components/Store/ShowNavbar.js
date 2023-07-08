import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
    name: "show",
    initialState: {
        show: false,
    },
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        }
    }
});

export const { setShow } = showSlice.actions;
export default showSlice.reducer;