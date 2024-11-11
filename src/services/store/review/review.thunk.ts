import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReview } from "./review.model";

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
    console.log("pasddvf", payload);

    const { response, data } = await client.post(prefix, payload);

    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
