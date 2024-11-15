import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { editProfile, forgotPassword, getProfile, login, logout, register, resetPassword, verifyEmail } from "./auth.thunk";
import { IForgotPasswordResponseData, ILoginResponseData, IRegisterResponseData, IUserProfile, IVerifyEmailResponseData } from "./auth.model";

export interface IAuthInitialState extends Partial<IInitialState> {
  isLogin: boolean;
  profile: IUserProfile | null;
  loginTime: number;
  isNewUser: boolean;
}

const initialState: IAuthInitialState = {
  isLogin: false,
  profile: null,
  isNewUser: false,
  loginTime: 0,
  status: EFetchStatus.IDLE,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
    addProductToWishlist(state, action: PayloadAction<string[]>) {
      if (state.profile) {
        state.profile.wishlist = action.payload;
      }
    },
  },

  extraReducers(builder) {
    // ? Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<IResponse<IUserProfile>>) => {
        state.profile = payload.metaData;
        state.isLogin = true;
        state.isNewUser = payload.metaData?.isNewUser;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Edit Profile
    builder
      .addCase(editProfile.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(editProfile.fulfilled, (state, { payload }: PayloadAction<IResponse<IUserProfile>>) => {
        if (state.profile) {
          state.profile = {
            ...state.profile,
            ...payload.metaData,
          };
        }
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(editProfile.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });

    // ? register
    builder
      .addCase(register.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(register.rejected, (state, action) => {
        const payload = action.payload as IResponse<IRegisterResponseData>;
        state.message = payload?.errors?.auth || "Register failed! Please try again!";
        state.status = EFetchStatus.REJECTED;
      });
    // ? verify email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        const payload = action.payload as IResponse<IVerifyEmailResponseData>;
        state.message = payload?.errors?.auth || "Your verification token is invalid or exprised";
        state.status = EFetchStatus.REJECTED;
      });
    // ? forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        const payload = action.payload as IResponse<IForgotPasswordResponseData>;
        state.message = payload?.errors?.auth || "Có lỗi xảy ra! vui lòng thử lại sau";
        state.status = EFetchStatus.REJECTED;
      });
    // ? reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.message = "Your verification token is invalid or exprised";
        state.status = EFetchStatus.REJECTED;
      });
    // ? Login
    builder
      .addCase(login.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IResponse<ILoginResponseData>>) => {
        localStorage.setItem("accessToken", JSON.stringify(payload.metaData?.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(payload.metaData?.refreshToken));
        state.isNewUser = payload.metaData.userData.isNewUser;
        state.loginTime = new Date().getTime() / 1000;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(login.rejected, (state, action) => {
        const payload = action.payload as IResponse<ILoginResponseData>;
        state.message = payload?.errors?.auth || "Login failed! Please try again!";
        state.status = EFetchStatus.REJECTED;
      });
    // ? Logout
    builder
      .addCase(logout.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.isLogin = false;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(logout.rejected, (state) => {
        state.message = "Logout failed! Please try again!";
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, addProductToWishlist } = authSlice.actions;
export { authSlice };
