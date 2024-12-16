import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IVoucher } from "../voucher/voucher.model";

export interface IShippingAddress {
  user_email: string;
  user_name: string;
  phone_number: string;
  city: string;
  district: string;
  commune: string;
  detail_address: string;
  note?: string;
}

export type TPaymentMethod = "vnpay" | "payos" | "cod";

export interface IPaymentMethodLabel {
  label: string;
  value: TPaymentMethod;
  image: string;
}

export interface ICheckoutState {
  status: EFetchStatus;
  message: string;
  currentStep: number;
  shippingAddress: IShippingAddress;
  paymentType: TPaymentMethod;
  discount_price: number;
  voucher?: IVoucher;
  shipping_fee: number;
  isUseUserAddress: boolean;
}

export interface IGhnShippingFee {
  total: number;
  service_fee: number;
  insurance_fee: number;
  pick_station_fee: number;
  coupon_value: number;
  r2s_fee: number;
  return_again: number;
  document_return: number;
  double_check: number;
  cod_fee: number;
  pick_remote_areas_fee: number;
  deliver_remote_areas_fee: number;
  cod_failed_fee: number;
}
