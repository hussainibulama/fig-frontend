import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
export default configureStore({
  reducer: {
    data: counterReducer,
  },
});
