import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReview } from "./review.model";

const prefix = "/api/client/reviews";

export const getAllReviews = createAsyncThunk("review/get-all-reviews", async (productId: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IReview[]>(`/api/client/products/${productId}/reviews`);
    return response.status >= 400 ? rejectWithValue({ message: "Không thể lấy danh sách đánh giá" }) : data;
  } catch (error: any) {
    return rejectWithValue({ message: error.response?.data?.message ?? "Có lỗi xảy ra khi lấy danh sách đánh giá" });
  }
});

export const createReview = createAsyncThunk(
  "review/create-review",
  async (payload: Partial<IReview> & { isReply?: boolean }, { rejectWithValue }) => {
    try {
      const url = prefix;
      const requestData: Record<string, any> = payload.isReply
        ? {
            id: payload.id,
            reply: payload.reply,
            content: "",
            rates: 0,
          }
        : {
            content: payload.content,
            rates: payload.rates,
            orderItemId: payload.orderItemId,
          };

      const { response, data } = await client.post(url, requestData);
      return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? { message: "Có lỗi xảy ra khi gửi yêu cầu" });
    }
  },
);
