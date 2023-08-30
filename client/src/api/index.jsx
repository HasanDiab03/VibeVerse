import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const url = "http://localhost:5000/posts";

export const fetchPosts = createAsyncThunk("getPosts", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "something went wrong when fetching data..."
    );
  }
});

export const createPost = createAsyncThunk(
  "createPost",
  async (newPost, thunkAPI) => {
    try {
      const { data } = await axios.post(url, newPost);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong when creating a post"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ id, postData }, thunkAPI) => {
    try {
      // console.log(id, postData);
      const { data } = await axios.patch(`${url}/${id}`, postData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong when updating a post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${url}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong when deleting a post"
      );
    }
  }
);

export const likePost = createAsyncThunk("likePost", async (id, thunkAPI) => {
  try {
    const { data } = await axios.patch(`${url}/${id}/likePost`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong when liking a post");
  }
});
