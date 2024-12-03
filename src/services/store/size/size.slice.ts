import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllSize } from "./size.thunk";
import { ISize } from "../product/product.model";

export interface ISizeInitialState extends Partial<IInitialState> {
  sizes: ISize[];
  loading: boolean;
  error: string | null;
}

const initialState: ISizeInitialState = {
  sizes: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Sizes
    builder
      .addCase(getAllSize.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllSize.fulfilled, (state, { payload }: PayloadAction<IResponse<ISize[]>>) => {
        state.loading = false;
        state.sizes = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllSize.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch sizes";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = sizesSlice.actions;
export { sizesSlice };
