import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllColor } from "./color.thunk";
import { IColor } from "../product/product.model";

export interface IColorInitialState extends Partial<IInitialState> {
  colors: IColor[];
  loading: boolean;
  error: string | null;
}

const initialState: IColorInitialState = {
  colors: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Colors
    builder
      .addCase(getAllColor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllColor.fulfilled, (state, { payload }: PayloadAction<IResponse<IColor[]>>) => {
        state.loading = false;
        state.colors = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        console.log("getAllColor.rejected");
        console.log("error", action.error);

        state.loading = false;
        state.error = "Failed to fetch colors";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = colorsSlice.actions;
export { colorsSlice };
