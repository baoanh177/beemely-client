import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
