import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { formatPrice } from "@/utils/curency";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const CartTotal = () => {
  const { state } = useArchive<ICartInitialState>("cart");

  return (
    <div className="w-full rounded-xl border border-primary-10% px-4 py-5 shadow-lg">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-primary-500">
            <p>Tổng giá sản phẩm</p>
            <p>{formatPrice(state.subTotal)}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between text-base font-bold text-primary-500">
            <p>Tạm tính</p>
            <p>{formatPrice(state.subTotal)}</p>
          </div>
          <p className="text-xs text-primary-400">Phí vận chuyển và chọn voucher giảm giá sẽ được thực hiện ở trang thanh toán.</p>
        </div>
        <Link to="/checkout" className="block">
          <Button text="Tiến hành thanh toán" size="full" />
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
