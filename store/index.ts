import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    // TODO - Add reducer here
  },
  devTools: process.env.NODE_ENV === "development",
});
