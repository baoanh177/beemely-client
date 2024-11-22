import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IGender } from "../product/product.model";
import { IResponse } from "@/shared/utils/shared-interfaces";

const genderPrefix = "/api/client";

export const getAllGender = createAsyncThunk<IResponse<IGender[]>, void>("genders/getAllGender", async () => {
  try {
    const { response, data } = await client.get<IGender>(`${genderPrefix}/genders`);
    return response.status >= 400 ? data : data;
  } catch (error: any) {
    return error.response.data;
  }
});
