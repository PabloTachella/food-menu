import { configureStore } from "@reduxjs/toolkit";
// Reducer
import user from "./slices/user";
import dishes from "./slices/dishes";

export default configureStore({
  reducer: {
    user,
    dishes
  }
})