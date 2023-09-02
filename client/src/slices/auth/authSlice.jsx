/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../../api/auth";

const user = JSON.parse(localStorage.getItem("profile"));

const initialState = {
  authData: user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser: (state, action) => {
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: { ...action?.payload } };
    },
    
    logout: (state) => {
      localStorage.clear();
      return { ...state, authData: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify(action?.payload));
        return { ...state, authData: { ...action?.payload } };
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload);
        localStorage.setItem("profile", JSON.stringify(action?.payload));
        return { ...state, authData: { ...action?.payload } };
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const { authUser, logout } = authSlice.actions;

export default authSlice.reducer;
