import { IInitialState, IResponse } from "./../../../shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview, IReviewHistory } from "./review.model";
import { createReview, deleteReview, getAllReviews, getMyReviews } from "./review.thunk";
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
    resetStatus(state: IReviewInitialState) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state: IReviewInitialState) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllReviews.fulfilled, (state: IReviewInitialState, { payload }: any) => {
        state.reviews = payload;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllReviews.rejected, (state: IReviewInitialState, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi lấy danh sách đánh giá";
      })
      // get review user
      .addCase(getMyReviews.pending, (state: IReviewInitialState) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getMyReviews.fulfilled, (state: IReviewInitialState, { payload }: PayloadAction<IReviewHistory[]>) => {
        state.myReviews = payload;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getMyReviews.rejected, (state: IReviewInitialState, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi lấy lịch sử đánh giá";
      })
      // create review
      .addCase(createReview.pending, (state: IReviewInitialState) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createReview.fulfilled, (state: IReviewInitialState, { payload }: PayloadAction<IResponse<IReview>>) => {
        state.reviews.push(payload.metaData);
        state.status = EFetchStatus.FULFILLED;
        state.message = "Gửi đánh giá thành công";
      })
      .addCase(createReview.rejected, (state: IReviewInitialState, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi gửi đánh giá";
      })
      // delete review
      .addCase(deleteReview.pending, (state: IReviewInitialState) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteReview.fulfilled, (state: IReviewInitialState, { payload }: PayloadAction<string>) => {
        state.myReviews = state.myReviews.filter((review) => review.id !== payload);
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa đánh giá thành công";
      })
      .addCase(deleteReview.rejected, (state: IReviewInitialState, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi xóa đánh giá";
      });
  },
});

export const { resetStatus } = reviewSlice.actions;
export { reviewSlice };
