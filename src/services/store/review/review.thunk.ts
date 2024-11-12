import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReview } from "./review.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/client/reviews";

export const getAllReviews = createAsyncThunk("review/get-all-reviews", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IReview[]>(`${prefix}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createReview = createAsyncThunk("review/create-review", async (payload: IReview, { rejectWithValue }) => {
  try {
    const thunkPayload: IThunkPayload = { body: payload };
    const { response, data } = await client.post(prefix, thunkPayload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
