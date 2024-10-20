import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "./cart.model";
import { addToCart, deleteCartItem, getCartByUser, updateCartItem } from "./cart.thunk";

export interface ICartInitialState extends IInitialState {
  cart: ICart | null;
}

const initialState: ICartInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },
  extraReducers(builder) {
    // Get all cart
    builder
      .addCase(getCartByUser.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getCartByUser.fulfilled, (state, { payload }: PayloadAction<IResponse<ICart>>) => {
        state.cart = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getCartByUser.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(addToCart.fulfilled, (state, { payload }: PayloadAction<IResponse<ICart>>) => {
        state.cart = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })
      //@ts-ignore
      .addCase(updateCartItem.fulfilled, (state, { payload }: PayloadAction<IResponse<ICart>>) => {
        state.cart = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== payload);
        }
      })
      .addCase(deleteCartItem.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus } = cartSlice.actions;
export { cartSlice };
