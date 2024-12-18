import { EStatusOrder } from "@/shared/enums/order";
import { IUserProfile } from "../auth/auth.model";
import { IProduct, IVariant } from "../product/product.model";
import { IComplaint } from "../complaint/complaint.model";
import { IVoucher } from "../voucher/voucher.model";
import { TPaymentMethod } from "../checkout/checkout.model";

export interface IOrder {
  id: string;
  user: IUserProfile;
  items: IOrderItem[];
  totalPrice: number;
  regularTotalPrice: number;
  discountPrice: number;
  shippingAddress: string;
  phoneNumber: string;
  orderStatus: EStatusOrder;
  paymentStatus: EPaymentStatus;
  paymentType: TPaymentMethod;
  userName: string;
  shippingFee: number;
  userEmail: string;
  uniqueId: string;
  note?: string;
  complaint?: IComplaint;
  voucher?: IVoucher;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderItem {
  id: string;
  product: IProduct;
  quantity: number;
  price: number;
  variant: IVariant;
  hasFeedback: boolean;
}

export interface ICreateOrderResponse {
  checkoutUrl: string;
}

export enum EPaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}
