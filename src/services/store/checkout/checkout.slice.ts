import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckoutState, IPaymentMethodLabel, IShippingAddress, TPaymentMethod } from "./checkout.model";
import PayOsLogo from "@/assets/images/payos-logo.svg";
import VnPayLogo from "@/assets/images/vnpay-logo.svg";
import CodLogo from "@/assets/images/cod-logo.svg";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IVoucher } from "../voucher/voucher.model";

export const PAYMENT_METHODS: IPaymentMethodLabel[] = [
  { label: "Thanh toán khi nhận hàng", value: "cod", image: CodLogo },
  { label: "Thanh toán Bằng PayOs", value: "payos", image: PayOsLogo },
  { label: "Thanh toán bằng VNpay", value: "vnpay", image: VnPayLogo },
] as const;

const initialState: ICheckoutState = {
  status: EFetchStatus.IDLE,
  message: "",
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
  shipping_fee: 0,
  paymentType: "cod",
  discount_price: 0,
  voucher: undefined,
  isUseUserAddress: true,
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
    setUseUserAddress: (state, action: PayloadAction<boolean>) => {
      state.isUseUserAddress = action.payload;
      if (!action.payload) {
        state.shippingAddress = initialState.shippingAddress;
      }
    },
    resetCheckout: () => initialState,
    setShippingFee: (state, action: PayloadAction<number>) => {
      state.shipping_fee = action.payload;
    },
    resetVoucher: (state) => {
      state.voucher = undefined;
      state.discount_price = 0;
    },
  },
});

export const {
  setCurrentStep,
  setShippingAddress,
  setPaymentMethod,
  resetCheckout,
  setShippingFee,
  setVoucher,
  resetVoucher,
  setUseUserAddress,
} = checkoutSlice.actions;
export { checkoutSlice };
