import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllGender } from "./gender.thunk";
import { IGender } from "../product/product.model";

export interface IGenderInitialState extends Partial<IInitialState> {
  genders: IGender[];
  loading: boolean;
  error: string | null;
}

const initialState: IGenderInitialState = {
  genders: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Genders
    builder
      .addCase(getAllGender.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllGender.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender[]>>) => {
        state.loading = false;
        state.genders = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllGender.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch genders";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = gendersSlice.actions;
export { gendersSlice };
