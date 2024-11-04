import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { useArchive } from "@/hooks/useArchive";
import Title from "@/components/common/Title";
import CartItem from "@/components/cart/CartItem";

const CartList = () => {
  const { state: cartState } = useArchive<ICartInitialState>("cart");
  const cartItems = cartState.cart?.cartItems || [];

  return (
    <div className="space-y-4 border-b border-primary-10% py-2">
      <Title text="Sản phẩm" className="text-xl" />
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
