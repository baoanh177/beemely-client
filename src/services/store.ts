import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";
import { productApi } from "./store/product/product.slice";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
