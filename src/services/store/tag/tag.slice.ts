import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTag } from "./tag.thunk";
import { ITag } from "../product/product.model";

export interface ITagInitialState extends IInitialState {
  tag: ITag[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: ITagInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  tag: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: "tags",
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
      .addCase(getAllTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllTag.fulfilled, (state, { payload }: PayloadAction<IResponse<ITag[]>>) => {
        state.loading = false;
        state.tags = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllTag.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tags";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = tagSlice.actions;
export { tagSlice };
