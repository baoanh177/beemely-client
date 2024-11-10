import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getAllVoucher } from "./voucher.thunk";
import { IVoucher } from "./voucher.model";

export interface IVoucherInitialState extends Partial<IInitialState> {
  vouchers: IVoucher[];
  loading: boolean;
  error: string | null;
}

const initialState: IVoucherInitialState = {
  vouchers: [],
  loading: false,
  error: null,
  status: EFetchStatus.IDLE,
  message: "",
};

const vouchersSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get All Vouchers
    builder
      .addCase(getAllVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllVoucher.fulfilled, (state, { payload }: PayloadAction<IResponse<IVoucher[]>>) => {
        state.loading = false;
        console.log(payload);
        state.vouchers = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllVoucher.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch vouchers";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = vouchersSlice.actions;
export { vouchersSlice };
