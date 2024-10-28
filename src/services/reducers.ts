import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { cartSlice } from "./store/cart/cart.slice";
import { wishlistSlice } from "./store/wishlist/wishlist.slice";
import { orderSlice } from "./store/order/order.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  wishlist: wishlistSlice.reducer,
  order: orderSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
