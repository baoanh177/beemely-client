import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IProduct } from "./product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getAllProducts, getProductBySlug } from "./product.thunk";

export interface IProductInitialState extends IInitialState {
  products: IProduct[];
  activeProduct: IProduct | undefined;
  filter: {
    q: string;
    _page: number;
    _limit: number;
    orderBy: number;
    sort: string;
    gender?: string[];
    color?: string[];
    size?: string[];
    brand?: string[];
    productType?: string[];
    minPrice: string;
    maxPrice: string;
    label: string;
    tag: string;
  };
}

const initialState: IProductInitialState = {
  products: [],
  activeProduct: undefined,
  filter: {
    q: "",
    _page: 1,
    _limit: 10,
    orderBy: 0,
    sort: "",
    gender: [],
    color: [],
    size: [],
    brand: [],
    productType: [],
    minPrice: "",
    maxPrice: "",
    label: "",
    tag: "",
  },
  totalRecords: 0,
  message: "",
  status: EFetchStatus.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
    updateFilters(state, action: PayloadAction<Partial<IProductInitialState["filter"]>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Get all products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = EFetchStatus.PENDING;
        state.message = "";
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
        state.products = payload.metaData;
        state.totalRecords = payload.totalDocs ?? 0;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
        state.message = "Failed to fetch all products";
      });

    // Get product by id
    builder
      .addCase(getProductBySlug.pending, (state) => {
        state.status = EFetchStatus.PENDING;
        state.message = "";
      })
      .addCase(getProductBySlug.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct>>) => {
        state.activeProduct = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getProductBySlug.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
        state.message = "Failed to fetch product by slug";
      });
  },
});

export const { resetStatus, updateFilters } = productSlice.actions;
export { productSlice };
