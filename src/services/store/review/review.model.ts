import { IUserProfile } from "../auth/auth.model";
import { IOrderItem } from "../order/order.model";

export interface IReview {
  id?: string;
  content?: string;
  images?: string[];
  rates?: number;
  orderItemId?: string;
  reply?: string | undefined;
}
export interface IReviewReply {
  id: string;
  reply: string;
}
export interface IReviewHistory {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  images: string[];
  rates: number;
  status: number;
  reply?: string;
  description: string;
  user: IUserProfile;
  orderItem: IOrderItem;
  replyDate: string;
}
