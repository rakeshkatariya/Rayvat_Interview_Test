import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice"; 
import productReducer from "./ProductSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, 
    products: productReducer,
  },
});

export default store;
