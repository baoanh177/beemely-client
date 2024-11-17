import { IInitialState, IResponse } from "./../../../shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview, IReviewHistory } from "./review.model";
import { createReview, getAllReviews, getMyReviews } from "./review.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

export interface IReviewInitialState extends IInitialState {
  status: EFetchStatus;
  message: string;
  reviews: IReview[];
  myReviews: IReviewHistory[];
}

const initialState: IReviewInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  reviews: [],
  myReviews: [],
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
      .addCase(getAllReviews.fulfilled, (state, { payload }: any) => {
        state.reviews = payload;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllReviews.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi lấy danh sách đánh giá";
      })
      // get review user
      .addCase(getMyReviews.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getMyReviews.fulfilled, (state, { payload }: PayloadAction<IReviewHistory[]>) => {
        state.myReviews = payload;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getMyReviews.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi lấy lịch sử đánh giá";
      })
      //

      .addCase(createReview.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createReview.fulfilled, (state, { payload }: PayloadAction<IResponse<IReview>>) => {
        // state.reviews.push(payload.metaData);
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
