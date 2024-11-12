import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "./review.model";
import { createReview, getAllReviews } from "./review.thunk";

export interface IReviewInitialState extends IInitialState {
  reviews: IReview[];
}

const initialState: IReviewInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllReviews.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }: PayloadAction<IResponse<IReview[]>>) => {
        console.log(payload);
        state.reviews = payload.metaData;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllReviews.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      })

      .addCase(createReview.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createReview.fulfilled, (state, { payload }: PayloadAction<IResponse<IReview>>) => {
        state.reviews.push(payload.metaData);
        state.status = EFetchStatus.FULFILLED;
        state.message = "Gửi đánh giá thành công";
      })
      .addCase(createReview.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi gửi đánh giá";
      });
  },
});

export const { resetStatus } = reviewSlice.actions;
export { reviewSlice };
