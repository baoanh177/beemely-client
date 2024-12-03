import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "./product.model";

const productPrefix = "/api/client";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async ({ query }: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(`${productPrefix}/products`, {
      query,
    });
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getProductBySlug = createAsyncThunk("product/getProductByIdSlug", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct>(`${productPrefix}/products/${payload.param}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getBestsellerProducts = createAsyncThunk("bestsellerProducts/getAll", async ({ query }: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(`${productPrefix}/products`, {
      query,
    });
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getInterestProducts = createAsyncThunk("interestProducts/getAll", async ({ query }: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(`${productPrefix}/products`, {
      query,
    });
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
