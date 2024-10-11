import { EActiveStatus } from "@/shared/enums/fetchStatus";

export interface IUserData {
  [key: string]: any;
}

export interface IUserProfile {
  id: string;
  fullName: string;
  userName: string;
  avatarUrl: string;
  email: string;
  addresses: unknown[];
  gender: unknown;
  phone: string;
  roles: unknown[];
  status: EActiveStatus;
  vouchers: unknown[];
  isVerified: boolean;
  isNewUser: boolean;
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
