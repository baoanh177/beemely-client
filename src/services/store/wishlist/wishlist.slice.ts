import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../product/product.model";
import { addWishList, deleteWishlist, getAllWishList, moveWishlist } from "./wishlist.thunk";
import { commonStaticReducers } from "@/services/shared";

export interface IWishListInitialState extends IInitialState {
  products: IProduct[];
}

const initialState: IWishListInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    ...commonStaticReducers<IWishListInitialState>(),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllWishList.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllWishList.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.products = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllWishList.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })

      .addCase(deleteWishlist.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteWishlist.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        if (state.products) {
          state.products = state.products.filter((item) => item.id !== payload);
        }
      })
      .addCase(deleteWishlist.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      })

      .addCase(moveWishlist.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })

      // @ts-ignore

      .addCase(moveWishlist.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.products = payload.metaData;
      })
      .addCase(moveWishlist.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      })

      .addCase(addWishList.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })

      // @ts-ignore
      .addCase(addWishList.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.products = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(addWishList.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = wishlistSlice.actions;
export { wishlistSlice };
