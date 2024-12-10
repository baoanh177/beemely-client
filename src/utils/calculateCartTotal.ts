import { ICartItem, ICart } from "@/services/store/cart/cart.model";

export const calculateCartTotal = (cart: ICart | null): number => {
  if (!cart || !cart.cartItems) return 0;
  return cart.cartItems.reduce((sum: number, item: ICartItem) => {
    const price = item?.variant?.discountPrice !== undefined && item.variant.discountPrice !== 0 ? item.variant.discountPrice : item.variant.price;
    return sum + price * item.quantity;
  }, 0);
};
