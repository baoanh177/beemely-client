import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICart } from "./cart.model";

const prefix = "/api/client/cart";

export const getCartByUser = createAsyncThunk("brand/get-cart-by-user", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ICart>(`${prefix}/user`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addToCart = createAsyncThunk("cart/add-to-cart", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ICart>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCartItem = createAsyncThunk("cart/delete-cart-item", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${payload.param}`);
    return response.status >= 400 ? rejectWithValue(data) : payload.param;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteAllCartItem = createAsyncThunk("cart/delete-all-cart-item", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCartItem = createAsyncThunk("cart/update-cart-item", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<ICart>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
