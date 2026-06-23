import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isCheckingAuth: true,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setIsCheckingAuth: (state) => {
      state.isCheckingAuth = false; 
    }
  },
});

export const { setCurrentUser, clearCurrentUser, setIsCheckingAuth } =
  authSlice.actions;

export default authSlice.reducer;
