import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { cartSlice } from "./store/cart/cart.slice";
import { productSlice } from "./store/product/product.slice";
import { bannerSlice } from "./store/banner/banner.slice";
import { categorySlice } from "./store/category/category.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  product: productSlice.reducer,
  banner: bannerSlice.reducer,
  category: categorySlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
