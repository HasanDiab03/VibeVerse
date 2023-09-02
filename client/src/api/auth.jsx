import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authURL = "http://localhost:5000/user";



export const signUp = createAsyncThunk(
  "singUp",
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authURL}/signUp`, formData);
      navigate("/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong when signing Up the user"
      );
    }
  }
);

export const signIn = createAsyncThunk(
  "singIn",
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authURL}/signIn`, formData);
      navigate("/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong when signing Up the user"
      );
    }
  }
);
