import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IComplaint } from "./complaint.model";
import { createNewComplaint, withdrawComplaint } from "./complaint.thunk";

export interface IComplaintInitialState extends Partial<IInitialState> {
  complaint: IComplaint | null;
}
interface ErrorPayload {
  errors: {
    message: string;
  };
}

const initialState: IComplaintInitialState = {
  complaint: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? create new complaint
    builder
      .addCase(createNewComplaint.pending, (state) => {
        state.loading = true;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createNewComplaint.fulfilled, (state, { payload }: PayloadAction<IResponse<IComplaint>>) => {
        state.loading = false;
        state.complaint = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(createNewComplaint.rejected, (state, action) => {
        const errorPayload = action.payload as ErrorPayload;
        state.loading = false;
        state.status = EFetchStatus.REJECTED;
        state.message = errorPayload.errors.message || "có lỗi xảy ra trong quá trình xử lí.";
      });
    // ? withdraw  complaint
    builder
      .addCase(withdrawComplaint.pending, (state) => {
        state.loading = true;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(withdrawComplaint.fulfilled, (state, { payload }: PayloadAction<IResponse<IComplaint>>) => {
        state.loading = false;
        state.complaint = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(withdrawComplaint.rejected, (state, action) => {
        const errorPayload = action.payload as ErrorPayload;
        state.loading = false;
        state.status = EFetchStatus.REJECTED;
        state.message = errorPayload.errors.message || "có lỗi xảy ra trong quá trình xử lí.";
      });
  },
});

export const { resetStatus } = complaintSlice.actions;
export { complaintSlice };
