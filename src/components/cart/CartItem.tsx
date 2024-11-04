import React from "react";
import { ICartItem } from "@/services/store/cart/cart.model";
import { HiOutlineTrash } from "react-icons/hi2";
import tw from "twin.macro";
import CartProduct from "./CartProduct";

const CartWrapper = tw.div`flex items-end justify-between space-x-4 border-b border-gray-20% p-4 last:border-b-0`;
const RemoveButton = tw.button`text-red-500 transition-colors duration-200 hover:text-red-700`;

interface CartItemProps {
  item: ICartItem;
  onRemove?: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const handleRemove = () => {
    if (onRemove) onRemove(item.id);
  };

  return (
    <CartWrapper>
      <CartProduct item={item} />
      {onRemove && (
        <RemoveButton onClick={handleRemove}>
          <HiOutlineTrash size={16} />
        </RemoveButton>
      )}
    </CartWrapper>
  );
};

export default CartItem;
