import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "./product.model";
import { client } from "../../config/client";

const productPrefix = "/api/client";

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct>(`${productPrefix}/products`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
