import { configureStore } from "@reduxjs/toolkit";
import PostReducer from './PostsSlice';
import CategoryReducer from './CategorySlice';
import AuthSlice from "./AuthSlice";
import HeadlineReducer from "./HeadlineSlice";
import ShowSlice from "./ShowNavbar";

const store = configureStore({
    reducer: {
        posts: PostReducer,
        category: CategoryReducer,
        auth: AuthSlice,
        headline: HeadlineReducer,
        show: ShowSlice,
    },
});

export default store;