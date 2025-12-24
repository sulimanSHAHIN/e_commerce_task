import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productReducer from "./productSlice";
import categoryProductReducer from "./categoryProductSlice"; 

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productReducer,
    categoryProducts: categoryProductReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
