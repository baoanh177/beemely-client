import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IProduct } from "./product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getBestsellerProducts } from "./product.thunk";

export interface IBestsellerInitialState extends IInitialState {
  products: IProduct[];
  filter: {
    _page: number;
    _limit: number;
    orderBy: string;
    sort: string;
  };
}

const initialState: IBestsellerInitialState = {
  products: [],
  filter: {
    _page: 1,
    _limit: 8,
    orderBy: "sold",
    sort: "desc",
  },
  totalRecords: 0,
  message: "",
  status: EFetchStatus.IDLE,
};

const bestsellerSlice = createSlice({
  name: "bestsellerProducts",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
    updateFilters(state, action: PayloadAction<Partial<IBestsellerInitialState["filter"]>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBestsellerProducts.pending, (state) => {
        state.status = EFetchStatus.PENDING;
        state.message = "";
      })
      .addCase(getBestsellerProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.products = payload.metaData;
        state.totalRecords = payload.totalDocs ?? 0;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getBestsellerProducts.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
        state.message = "Failed to fetch all products";
      });
  },
});

export const { resetStatus, updateFilters } = bestsellerSlice.actions;
export { bestsellerSlice };
