import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { cartSlice } from "./store/cart/cart.slice";
import { productsSlice } from "./store/product/product.slice";
import { productTypesSlice } from "./store/product-type/product-type.slice";
import { colorsSlice } from "./store/color/color.slice";
import { sizesSlice } from "./store/size/size.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  products: productsSlice.reducer,
  productTypes: productTypesSlice.reducer,
  colors: colorsSlice.reducer,
  sizes: sizesSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
