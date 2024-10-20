import { IUserProfile } from "../auth/auth.model";
import { IProduct, IVariant } from "../product/product.model";

export interface ICartItem {
  id: string;
  product: IProduct;
  quantity: number;
  variant: IVariant;
}

export type ICart = {
  id: string;
  user: IUserProfile;
  cartItems: ICartItem[];
};
