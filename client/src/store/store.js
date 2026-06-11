import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    auth: authReducer,
  },
});
