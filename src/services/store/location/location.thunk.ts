import { IGHNApiRegsponse } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "https://online-gateway.ghn.vn/shiip/public-api/master-data";

export const getAllProvinces = createAsyncThunk("location/getAllProvinces", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${prefix}/province`, {
      headers: {
        token: import.meta.env.VITE_GHN_TOKEN,
      },
      method: "GET",
    });
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data);
    }
    const data: IGHNApiRegsponse<IProvince[]> = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An error occurred while fetching provinces");
  }
});

export const getDistrictsByProvinceId = createAsyncThunk(
  "location/getDistrictsByProvinceId",
  async (provinceId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${prefix}/district?province_id=${provinceId}`, {
        headers: {
          token: import.meta.env.VITE_GHN_TOKEN,
        },
        method: "GET",
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
      const data: IGHNApiRegsponse<IDistrict[]> = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred while fetching districts");
    }
  },
);

export const getWardsByDistrictId = createAsyncThunk("location/getWardsByDistrictId", async (districtId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`${prefix}/ward?district_id=${districtId}`, {
      headers: {
        token: import.meta.env.VITE_GHN_TOKEN,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data);
    }
    const data: IGHNApiRegsponse<IWard[]> = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An error occurred while fetching wards");
  }
});
