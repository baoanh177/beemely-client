// src/location/locationThunks.ts
import { IGHNApiRegsponse, IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGhnShippingFee } from "./checkout.model";

const prefix = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

export const getShipingFeeFromGhn = createAsyncThunk("checkout/getShippingFeeGhn", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const response = await fetch(prefix, {
      headers: {
        token: import.meta.env.VITE_GHN_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.body),
      method: "POST",
    });
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data);
    }
    const data: IGHNApiRegsponse<IGhnShippingFee> = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An error occurred while fetching provinces");
  }
});
