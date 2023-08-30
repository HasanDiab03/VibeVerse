/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
import {
  createPost,
  deletePost,
  fetchPosts,
  likePost,
  updatePost,
} from "../../api";

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // console.log(action.payload);
        return [...state, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // console.log(action.payload);
        return state.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        return state.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        return state.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export default postSlice.reducer;
