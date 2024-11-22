import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITag } from "../product/product.model";
import { IResponse } from "@/shared/utils/shared-interfaces";

const prefix = "/api/client/tag";

export const getAllTag = createAsyncThunk<IResponse<ITag[]>, void>("tags/getAllTag", async () => {
  try {
    const { response, data } = await client.get<ITag>(`${prefix}`);
    return response.status >= 400 ? data : data;
  } catch (error: any) {
    return error.response.data;
  }
});
