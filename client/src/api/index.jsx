import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const url = "http://localhost:5000/posts";

const profile = JSON.parse(localStorage.getItem("profile"));

const config = {
  headers: {
    authorization: `Bearer ${profile?.token}`,
  },
};

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
  async ({ postData, name }, thunkAPI) => {
    try {
      const { data } = await axios.post(url, { postData, name }, config);
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
  async ({ id, postData, name }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${url}/${id}`,
        { postData, name },
        config
      );
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
      await axios.delete(`${url}/${id}`, {}, config);
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
    // console.log(config);
    const { data } = await axios.patch(`${url}/${id}/likePost`, {}, config);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong when liking a post");
  }
});
