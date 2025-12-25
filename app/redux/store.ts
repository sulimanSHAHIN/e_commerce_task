import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productReducer from "./productSlice";
import categoryProductReducer from "./categoryProductSlice"; 
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productReducer,
    categoryProducts: categoryProductReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,



  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
