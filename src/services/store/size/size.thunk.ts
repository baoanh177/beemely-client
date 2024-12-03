import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { ISize } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const sizePrefix = "/api/client/size";

export const getAllSize = createAsyncThunk("sizes/getAllSize", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ISize[]>(sizePrefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
