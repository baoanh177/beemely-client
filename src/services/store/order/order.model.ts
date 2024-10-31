import { IUserProfile } from "../auth/auth.model";
import { IProduct, IVariant } from "../product/product.model";

export interface IOrder {
  id: string;
  user: IUserProfile;
  items: IOrderItem[];
  totalPrice: number;
  regularTotalPrice: number;
  discountPrice: number;
  shippingAddress: string;
  phoneNumber: string;
  orderStatus: EOrderStatus;
  paymentStatus: EPaymentStatus;
  paymentType: string;
  userName: string;
  shippingFee: number;
  userEmail: string;
}

interface IOrderItem {
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

export enum EOrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
