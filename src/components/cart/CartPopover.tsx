import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Badge } from "antd";
import { BsMinecart, BsEye } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { useArchive } from "@/hooks/useArchive";
import Button from "@/components/common/Button";
import { formatPrice } from "@/utils/curency";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { deleteCartItem } from "@/services/store/cart/cart.thunk";

const CartPopover: React.FC = () => {
  const { state, dispatch } = useArchive<ICartInitialState>("cart");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteCartItem({ param: itemId }));
  };

  const cartItems = state.cart?.cartItems ?? [];

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  const handleViewCart = () => {
    setIsPopoverVisible(false);
  };

  const content =
    cartItems.length > 0 ? (
      <>
        <div className="max-h-96 w-[340px] overflow-y-auto md:w-[400px]" style={{ scrollbarWidth: "none" }}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
          ))}
        </div>
        <div className="space-y-3 border-t border-t-primary-10%">
          <div className="mt-4 flex justify-between text-base">
            <p className="font-bold">Tổng tiền</p>
            <p className="font-bold">{formatPrice(state.subTotal)}</p>
          </div>
          <div className="space-y-3">
            <Link className="block" to="/cart" onClick={handleViewCart}>
              <Button size="full" icon={<BsEye className="h-4 w-4" />} text="Xem giỏ hàng" variant="ghost" />
            </Link>
            <Link className="block" to={"/checkout"} onClick={handleViewCart}>
              <Button size="full" icon={<MdOutlinePayment className="h-4 w-4" />} text="Tiến hành đặt hàng" />
            </Link>
          </div>
        </div>
      </>
    ) : (
      <CartEmpty className="w-[400px]" />
    );

  return (
    <Popover
      content={content}
      title="Giỏ hàng"
      trigger="click"
      placement="bottomRight"
      open={isPopoverVisible}
      onOpenChange={setIsPopoverVisible}
    >
      <div key={cartCount}>
        <Badge count={cartCount} showZero color="#2B292F">
          <BsMinecart className="h-5 w-5 cursor-pointer" />
        </Badge>
      </div>
    </Popover>
  );
};

export default CartPopover;
