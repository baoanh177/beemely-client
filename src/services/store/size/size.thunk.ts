import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { ISize } from "../product/product.model";

const sizePrefix = "/api/client";

export const getAllSize = createAsyncThunk("sizes/getAllSize", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ISize>(`${sizePrefix}/size`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
