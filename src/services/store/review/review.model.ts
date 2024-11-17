export interface IReview {
  id?: string;
  content?: string;
  images?: string[];
  rates?: number;
  orderItemId?: string | undefined;
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

  product?: {
    id: string;
    name: string;
    [key: string]: any;
  };
  user: string;
  orderItem: {
    id: string;
    [key: string]: any;
    price: number;
  };
}
