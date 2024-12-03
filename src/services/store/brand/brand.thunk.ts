import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IBrand } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const sizePrefix = "/api/client/brands";

export const getAllBrand = createAsyncThunk("brands/getAllBrand", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IBrand[]>(sizePrefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
