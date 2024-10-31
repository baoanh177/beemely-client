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

export type TPaymentMethod = "vnpay" | "payos" | "zalopay";

export interface IPaymentMethodLabel {
  label: string;
  value: TPaymentMethod;
  image: string;
}

export interface ICheckoutState {
  currentStep: number;
  shippingAddress: IShippingAddress;
  paymentType: TPaymentMethod;
  discount_price: number;
}
