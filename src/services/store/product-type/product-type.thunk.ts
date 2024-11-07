import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IProductType } from "../product/product.model";

const productTypePrefix = "/api/client";

export const getAllProductTypes = createAsyncThunk("productTypes/getAllProductTypes", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProductType>(`${productTypePrefix}/product-type`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
