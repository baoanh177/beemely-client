import { EActiveStatus } from "@/shared/enums/fetchStatus";
import { EGender } from "@/shared/enums/genders";

export interface IUserData {
  [key: string]: any;
}

export interface IUserProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  addresses: IAddress[];
  gender: EGender;
  phone: string;
  roles: unknown[];
  status: EActiveStatus;
  vouchers: unknown[];
  isVerified: boolean;
  isNewUser: boolean;
  wishlist: string[];
  tags: string[];
}

export interface IAddress {
  id: string;
  commune: string;
  district: string;
  city: string;
  userId: string;
  detailAddress: string;
  default: boolean;
  province: string;
}

export interface ILoginResponseData {
  [key: string]: any;
}
export interface IRegisterResponseData {
  [key: string]: any;
}
export interface IForgotPasswordResponseData {
  [key: string]: any;
}

export interface IVerifyEmailResponseData {
  [key: string]: any;
}
