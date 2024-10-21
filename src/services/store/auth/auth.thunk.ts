import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../config/client";

import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { ILoginResponseData, IRegisterResponseData, IUserProfile } from "./auth.model";

const authPrefix = "/api/auth";

export const getProfile = createAsyncThunk("auth/get-profile", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IUserProfile>(`${authPrefix}/profile`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const editProfile = createAsyncThunk("auth/edit-profile", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IUserProfile>(`${authPrefix}/profile`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("auth/login", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILoginResponseData>(`${authPrefix}/login`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk("auth/register", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IRegisterResponseData>(`${authPrefix}/register`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const sendVerifyEmail = createAsyncThunk("auth/send-verify", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILoginResponseData>(`${authPrefix}/send-verify`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyEmail = createAsyncThunk("auth/verify-email", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILoginResponseData>(`${authPrefix}/verify-email`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const forgotPassword = createAsyncThunk("auth/forgot-password", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILoginResponseData>(`${authPrefix}/forgot-password`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (
    payload: IThunkPayload & {
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { response, data } = await client.post<ILoginResponseData>(`${authPrefix}/reset-password/${payload.token}`, payload);
      return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post(`${authPrefix}/logout`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
