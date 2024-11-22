import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITag } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/client/tag";

export const getAllTag = createAsyncThunk("tags/getAllTag", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ITag[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
