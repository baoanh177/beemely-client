import React, { useMemo } from "react";
import { ICartItem } from "@/services/store/cart/cart.model";
import { HiOutlineTrash } from "react-icons/hi2";
import tw from "twin.macro";
import CartProduct from "./CartProduct";
import clsx from "clsx";
import { EActiveStatus } from "@/shared/enums/fetchStatus";

const RemoveButton = tw.button`text-red-500 transition-colors duration-200 hover:text-red-700`;

interface CartItemProps {
  item: ICartItem;
  onRemove: (itemId: string) => void;
  isCheckoutPage?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, isCheckoutPage = false }) => {
  const isOutStock = useMemo(() => item.variant.stock === 0, [item.variant.stock]);
  const isInactivedProduct = item.product.status === EActiveStatus.INACTIVE;
  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className={clsx("space-y-2 border-b border-gray-20% p-4 last:border-b-0", isOutStock && "rounded-md bg-red-50")}>
      <div className={clsx("flex items-end justify-between space-x-4")}>
        <CartProduct item={item} />
        {!isCheckoutPage && (
          <RemoveButton onClick={handleRemove}>
            <HiOutlineTrash size={16} />
          </RemoveButton>
        )}
      </div>
      {(isOutStock || isInactivedProduct) && (
        <div className="flex justify-between">
          <p className="text-xs text-red-500">
            {isOutStock
              ? "Hết hàng, vui lòng xóa khỏi giỏ hàng"
              : isInactivedProduct
                ? "Sản phẩm bị vô hiệu hóa, không thể mua sản phẩm lúc này, vui lòng xóa!"
                : ""}
          </p>
          {isCheckoutPage && (
            <RemoveButton onClick={handleRemove}>
              <HiOutlineTrash size={16} />
            </RemoveButton>
          )}
        </div>
      )}
    </div>
  );
};

export default CartItem;
