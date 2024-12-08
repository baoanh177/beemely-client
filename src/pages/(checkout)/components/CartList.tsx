import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { useArchive } from "@/hooks/useArchive";
import Title from "@/components/common/Title";
import CartItem from "@/components/cart/CartItem";
import { deleteCartItem } from "@/services/store/cart/cart.thunk";

const CartList = () => {
  const { state: cartState, dispatch } = useArchive<ICartInitialState>("cart");
  const cartItems = cartState.cart?.cartItems || [];

  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteCartItem({ param: itemId }));
  };

  return (
    <div className="space-y-4 border-b border-primary-10% py-2">
      <Title text="Sản phẩm" className="text-xl" />
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} isCheckoutPage onRemove={handleRemoveItem} />
      ))}
    </div>
  );
};

export default CartList;
