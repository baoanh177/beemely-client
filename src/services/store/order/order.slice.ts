import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { getAllOrderByUser } from "./order.thunk";
import { IOrder } from "./order.model";

export interface IOrderInitialState extends IInitialState {
  items: IOrder[];
}

const initialState: IOrderInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ...commonStaticReducers<IOrderInitialState>(),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrderByUser.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllOrderByUser.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder[]>>) => {
        state.items = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllOrderByUser.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })
  },
});

export const { resetStatus } = orderSlice.actions;
export { orderSlice };
