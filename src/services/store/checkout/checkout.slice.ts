import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckoutState, IGhnShippingFee, IPaymentMethodLabel, IShippingAddress, TPaymentMethod } from "./checkout.model";
import PayOsLogo from "@/assets/images/payos-logo.svg";
import VnPayLogo from "@/assets/images/vnpay-logo.svg";
import { getShipingFeeFromGhn } from "./checkout.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IGHNApiRegsponse } from "@/shared/utils/shared-interfaces";

export const PAYMENT_METHODS: IPaymentMethodLabel[] = [
  { label: "Thanh toán Bằng PayOs", value: "payos", image: PayOsLogo },
  { label: "Thanh toán bằng VNpay", value: "vnpay", image: VnPayLogo },
] as const;

interface ErrorPayload {
  message: string;
}

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
  paymentType: "payos",
  discount_price: 0,
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
    resetCheckout: () => initialState,
    resetShippingFee: (state, action: PayloadAction<number>) => {
      state.shipping_fee = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getShipingFeeFromGhn.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getShipingFeeFromGhn.fulfilled, (state, { payload }: PayloadAction<IGHNApiRegsponse<IGhnShippingFee>>) => {
        state.shipping_fee = payload.data.total;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getShipingFeeFromGhn.rejected, (state, { payload }) => {
        state.status = EFetchStatus.REJECTED;
        const errorPayload = payload as ErrorPayload;
        state.message = errorPayload.message || "Something went wrong!";
      });
  },
});

export const { setCurrentStep, setShippingAddress, setPaymentMethod, resetCheckout, resetShippingFee } = checkoutSlice.actions;
export { checkoutSlice };
