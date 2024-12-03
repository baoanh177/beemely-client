import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllBrand } from "./brand.thunk";
import { IBrand } from "../product/product.model";

export interface IBrandInitialState extends Partial<IInitialState> {
  brands: IBrand[];
  loading: boolean;
  error: string | null;
}

const initialState: IBrandInitialState = {
  brands: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Brands
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllBrand.fulfilled, (state, { payload }: PayloadAction<IResponse<IBrand[]>>) => {
        state.loading = false;
        state.brands = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllBrand.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch brands";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = brandsSlice.actions;
export { brandsSlice };
