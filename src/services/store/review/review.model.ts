export interface IReview {
  id?: string;
  content: string;
  images?: string[];
  rates?: number;
  orderItemId: string | undefined;
  reply?: string | undefined;
}
export interface IReviewReply {
  id: string;
  reply: string;
}
