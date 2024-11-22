import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllProductTypes } from "./product-type.thunk";
import { IProductType } from "../product/product.model";

export interface IProductTypeInitialState extends Partial<IInitialState> {
  productTypes: IProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductTypeInitialState = {
  productTypes: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const productTypesSlice = createSlice({
  name: "productTypes",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get ProductTypes
    builder
      .addCase(getAllProductTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllProductTypes.fulfilled, (state, { payload }: PayloadAction<IResponse<IProductType[]>>) => {
        state.loading = false;
        state.productTypes = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllProductTypes.rejected, (state) => {
        state.error = "Failed to fetch product types";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = productTypesSlice.actions;
export { productTypesSlice };
