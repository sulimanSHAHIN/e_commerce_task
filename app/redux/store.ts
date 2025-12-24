import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

// 🔹 Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
