import { EActiveStatus } from "@/shared/enums/fetchStatus";

export interface IUserData {
  [key: string]: any;
}

export interface IUserProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  addresses: IAddress[];
  gender: EGenders;
  phone: string;
  roles: unknown[];
  status: EActiveStatus;
  vouchers: unknown[];
  isVerified: boolean;
  isNewUser: boolean;
}

export interface IAddress {
  id: string;
  commune: string;
  district: string;
  city: string;
  userId: string;
  detailAddress: string;
  default: boolean; 
}
export enum EGenders {
  NAM = "Nam",
  NỮ = "Nữ",
  KHÁC = "Khác",
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
