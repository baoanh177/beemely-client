import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IColor } from "../product/product.model";
import { IResponse } from "@/shared/utils/shared-interfaces";

const colorPrefix = "/api/client";

export const getAllColor = createAsyncThunk<IResponse<IColor[]>, void>("colors/getAllColor", async () => {
  try {
    const { response, data } = await client.get<IColor>(`${colorPrefix}/color`);
    return response.status >= 400 ? data : data;
  } catch (error: any) {
    return error.response.data;
  }
});
