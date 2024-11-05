import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { formatPrice } from "@/utils/curency";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const CartTotal = () => {
  const { state } = useArchive<ICartInitialState>("cart");

  return (
    <div className="rounded-xl border border-primary-10% px-4 py-5 shadow-lg">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-primary-500">
            <p>Giá tạm tính</p>
            <p>{formatPrice(state.subTotal)}</p>
          </div>
          <div className="flex justify-between text-sm text-primary-200">
            <p>Giảm giá</p>
            <p>---</p>
          </div>
          <div className="flex justify-between text-sm text-primary-200">
            <p>Phí vận chuyển</p>
            <p>---</p>
          </div>
        </div>
        <div className="flex justify-between text-base font-bold text-primary-500">
          <p>Tổng</p>
          <p>{formatPrice(state.subTotal)}</p>
        </div>
        <Link to="/checkout" className="block">
          <Button text="Tiến hành thanh toán" size="full" />
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
