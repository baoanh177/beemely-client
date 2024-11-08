import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckoutState, IPaymentMethodLabel, IShippingAddress, TPaymentMethod } from "./checkout.model";
import PayOsLogo from "@/assets/images/payos-logo.svg";
import VnPayLogo from "@/assets/images/vnpay-logo.svg";
import { IVoucher } from "../voucher/voucher.model";

export const PAYMENT_METHODS: IPaymentMethodLabel[] = [
  { label: "Thanh toán Bằng PayOs", value: "payos", image: PayOsLogo },
  { label: "Thanh toán bằng VNpay", value: "vnpay", image: VnPayLogo },
] as const;

const initialState: ICheckoutState = {
  currentStep: 0,
  shippingAddress: {
    user_name: "",
    phone_number: "",
    user_email: "",
    city: "",
    district: "",
    commune: "",
    detail_address: "",
    note: "",
  },
  paymentType: "payos",
  discount_price: 0,
  voucher: undefined,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<IShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<TPaymentMethod>) => {
      state.paymentType = action.payload;
    },
    setVoucher: (state, action: PayloadAction<IVoucher & { discount: number }>) => {
      const voucher = action.payload;
      state.voucher = voucher;
      state.discount_price = voucher.discount;
    },
    resetCheckout: () => initialState,
  },
});

export const { setCurrentStep, setShippingAddress, setPaymentMethod, resetCheckout, setVoucher } = checkoutSlice.actions;
export { checkoutSlice };
