export interface IReview {
  content: string;
  images?: string[];
  rates: number;
  orderItemId: string | undefined;
  reply?: string;
}
export interface ICreateReviewPayload {
  rates: number;
  content: string;
  images?: string[];
  orderItemId: string;
}
