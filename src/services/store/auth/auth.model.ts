export interface IUserData {
  [key: string]: any;
}

export interface IUserProfile extends IUserData {}
export interface ILoginResponseData extends IUserData {}
export interface IRegisterResponseData extends IUserData {}
export interface IForgotPasswordResponseData extends IUserData {}
export interface IVerifyEmailResponseData extends IUserData {}
