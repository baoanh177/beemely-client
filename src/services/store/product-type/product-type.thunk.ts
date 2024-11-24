import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IProductType } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const productTypePrefix = "/api/client/product-type";

export const getAllProductTypes = createAsyncThunk("productTypes/getAllProductTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProductType[]>(productTypePrefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
