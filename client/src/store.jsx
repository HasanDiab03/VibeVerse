import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/posts/postSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
