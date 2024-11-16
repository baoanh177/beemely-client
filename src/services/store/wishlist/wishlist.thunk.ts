import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/client";

export const getAllWishList = createAsyncThunk("wishlist/get-all-wishlist", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(`${prefix}/wishlist`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const deleteWishlist = createAsyncThunk("wishlist/delete-item-wishlish", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch(`${prefix}/wishlist/${payload.param}/remove`);
    return response.status >= 400 ? rejectWithValue(data) : payload.param;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const moveWishlist = createAsyncThunk("wishlist/move-item-wishlish", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch(`${prefix}/wishlist/${payload.param}/remove`);
    return response.status >= 400 ? rejectWithValue(data) : payload.param;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const addWishList = createAsyncThunk("wishlist/add-item-wishlish", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch(`${prefix}/wishlist/${payload.param}/add`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
