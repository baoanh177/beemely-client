import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IProduct } from "./product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getInterestProducts } from "./product.thunk";

export interface IInterestInitialState extends IInitialState {
  products: IProduct[];
  filter: {
    _page: number;
    _limit: number;
    tags: string;
  };
}

const initialState: IInterestInitialState = {
  products: [],
  filter: {
    _page: 1,
    _limit: 8,
    tags: "",
  },
  totalRecords: 0,
  message: "",
  status: EFetchStatus.IDLE,
};

const interestSlice = createSlice({
  name: "interestProducts",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
    updateFilters(state, action: PayloadAction<Partial<IInterestInitialState["filter"]>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInterestProducts.pending, (state) => {
        state.status = EFetchStatus.PENDING;
        state.message = "";
      })
      .addCase(getInterestProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.products = payload.metaData;
        state.totalRecords = payload.totalDocs ?? 0;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getInterestProducts.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
        state.message = "Failed to fetch all products";
      });
  },
});

export const { resetStatus, updateFilters } = interestSlice.actions;
export { interestSlice };
