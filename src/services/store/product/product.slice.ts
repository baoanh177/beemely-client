import { IProduct } from "@/services/store/product/product.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getProducts } from "./product.thunk";

export interface IProductInitialState extends Partial<IInitialState> {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductInitialState = {
  products: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Products
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct>>) => {
        state.loading = false;
        state.products = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getProducts.rejected, (state) => {
        state.error = "Failed to fetch products";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = productsSlice.actions;
export { productsSlice };
