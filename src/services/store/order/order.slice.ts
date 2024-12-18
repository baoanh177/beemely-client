import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "./order.model";
import { createNewOrder, getOrderDetail, rePaymentOrder, updateOrder, getAllOrderByUser } from "./order.thunk";
import { commonStaticReducers } from "@/services/shared";

export interface IOrderInitialState extends IInitialState {
  orders: IOrder[] | [];
  activeOrder: IOrder | null;
}

const initialState: IOrderInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  orders: [],
  activeOrder: null,
  filter: { order_status: "" },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ...commonStaticReducers<IOrderInitialState>(),
  },
  extraReducers(builder) {
    // Create new order
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createNewOrder.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // Get one order
    builder
      .addCase(getOrderDetail.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getOrderDetail.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder>>) => {
        state.activeOrder = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // Update order
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder>>) => {
        state.orders = state.orders.map((order) => (order.id === payload.metaData.id ? payload.metaData : order));
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(updateOrder.rejected, (state, { payload }: any) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể cập nhật trạng thái đơn hàng";
      });
    // Re payment
    builder
      .addCase(rePaymentOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(rePaymentOrder.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(rePaymentOrder.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });

    builder
      .addCase(getAllOrderByUser.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllOrderByUser.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder[]>>) => {
        state.orders = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllOrderByUser.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, setFilter } = orderSlice.actions;
export { orderSlice };
