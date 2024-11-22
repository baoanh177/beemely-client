import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IGender } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const genderPrefix = "/api/client/genders";

export const getAllGender = createAsyncThunk("genders/getAllGender", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IGender[]>(genderPrefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
