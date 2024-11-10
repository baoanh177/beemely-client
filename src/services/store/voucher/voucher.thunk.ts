import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IVoucher } from "./voucher.model";

const voucherPrefix = "/api/client/voucher";

export const getAllVoucher = createAsyncThunk("vouchers/getAllVoucher", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IVoucher[]>(voucherPrefix);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
