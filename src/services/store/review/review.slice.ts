import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IReviewHistory } from "./review.model";
import { createReview, getAllReviews, getMyReviews } from "./review.thunk";

export interface IReviewInitialState extends IInitialState {
  status: EFetchStatus;
  message: string;
  reviews: IReviewHistory[];
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
      .addCase(getAllReviews.fulfilled, (state: IReviewInitialState, { payload }: PayloadAction<IResponse<IReviewHistory[]>>) => {
        state.reviews = payload.metaData;
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
      .addCase(getMyReviews.fulfilled, (state: IReviewInitialState, { payload }: PayloadAction<IResponse<IReviewHistory[]>>) => {
        state.myReviews = payload.metaData;
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
      .addCase(createReview.fulfilled, (state: IReviewInitialState) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Gửi đánh giá thành công";
      })
      .addCase(createReview.rejected, (state: IReviewInitialState, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload?.message ?? "Có lỗi xảy ra khi gửi đánh giá";
      });
  },
});

export const { resetStatus } = reviewSlice.actions;
export { reviewSlice };
