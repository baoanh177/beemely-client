import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IBrand, ISize } from "../product/product.model";
import { IResponse } from "@/shared/utils/shared-interfaces";

const sizePrefix = "/api/client";

export const getAllBrand = createAsyncThunk<IResponse<IBrand[]>, void>("brands/getAllBrand", async () => {
  try {
    const { response, data } = await client.get<ISize>(`${sizePrefix}/brands`);
    return response.status >= 400 ? data : data;
  } catch (error: any) {
    return error.response.data;
  }
});
