/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: true,
  post: "",
};
import {
  commentPost,
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  fetchPostsBySearch,
  likePost,
  updatePost,
} from "../../api";

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
          isLoading: false,
        };
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(createPost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // console.log(action.payload);
        return { ...state, posts: action.payload, isLoading: false };
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(updatePost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // console.log(action.payload);
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
          isLoading: false,
        };
      })
      .addCase(updatePost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(deletePost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
          isLoading: false,
        };
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(likePost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(likePost.fulfilled, (state, action) => {
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
          isLoading: false,
        };
      })
      .addCase(likePost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(fetchPostsBySearch.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        return { ...state, posts: action.payload, isLoading: false };
      })
      .addCase(fetchPostsBySearch.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(fetchPost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        return { ...state, post: action.payload, isLoading: false };
      })
      .addCase(fetchPost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      })
      .addCase(commentPost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        return {
          ...state,
          posts: state.posts.map((p) => {
            if (p._id === action.payload._id) {
              return action.payload;
            } else {
              return p;
            }
          }),
          post: action.payload,
          isLoading: false,
        };
      })
      .addCase(commentPost.rejected, (state, action) => {
        console.log(action.error);
        return { ...state, isLoading: false };
      });
  },
});

export default postSlice.reducer;
