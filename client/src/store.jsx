import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/posts/postSlice";
import authReducer from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
