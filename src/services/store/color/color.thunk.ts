import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IColor } from "../product/product.model";

const colorPrefix = "/api/client";

export const getAllColor = createAsyncThunk("colors/getAllColor", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IColor>(`${colorPrefix}/color`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
