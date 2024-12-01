import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReview, IReviewHistory } from "./review.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/client/reviews";

export const getAllReviews = createAsyncThunk("review/get-all-reviews", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IReviewHistory[]>(`/api/client/products/${payload.param}/reviews`);
    return response.status >= 400 ? rejectWithValue({ message: "Không thể lấy danh sách đánh giá" }) : data;
  } catch (error: any) {
    return rejectWithValue({ message: error.response?.data?.message ?? "Có lỗi xảy ra khi lấy danh sách đánh giá" });
  }
});

export const getMyReviews = createAsyncThunk("review/get-my-reviews", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IReviewHistory[]>(`${prefix}/my-reviews`);

    return response.status >= 400 ? rejectWithValue({ message: "Không thể lấy danh sách đánh giá" }) : data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message ?? "Có lỗi xảy ra khi lấy lịch sử đánh giá",
    });
  }
});

export const createReview = createAsyncThunk("review/create-review", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IReview>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    if (error.response?.status === 409) {
      try {
        const { response: reactivateResponse, data: reactivateData } = await client.post<IReview>(`${prefix}/reactivate`, payload);
        return reactivateResponse.status >= 400 ? rejectWithValue(reactivateData) : reactivateData;
      } catch (reactivateError: any) {
        return rejectWithValue(reactivateError.response?.data ?? { message: "Có lỗi xảy ra khi khôi phục đánh giá" });
      }
    }
    return rejectWithValue(error.response?.data ?? { message: "Có lỗi xảy ra khi gửi yêu cầu" });
  }
});
