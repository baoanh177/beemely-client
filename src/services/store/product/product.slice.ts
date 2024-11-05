import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IProduct } from "./product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getAllProducts, getProductById } from "./product.thunk";

export interface IProductInitialState extends IInitialState {
  products: IProduct[];
  activeProduct: IProduct | undefined;
}
const initialState: IProductInitialState = {
  products: [],
  activeProduct: undefined,
  filter: {
    _page: 1,
    _limit: 10,
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
  },

  extraReducers(builder) {
    // ? Get Products
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct>>) => {
        state.loading = false;
        state.products = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getProducts.rejected, (state) => {
        state.error = "Failed to fetch products";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = productsSlice.actions;
export { productsSlice };
  extraReducers: (builder) => {
    // ? Get all products
    builder.addCase(getAllProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
      state.products = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get product by id
    builder.addCase(getProductById.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct>>) => {
      state.activeProduct = payload.metaData;
    });
  },
});

export const { resetStatus } = productSlice.actions;
export { productSlice };
