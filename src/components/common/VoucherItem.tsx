import { IVoucher } from "@/services/store/voucher/voucher.model";
import { HiOutlineTicket, HiOutlineTruck } from "react-icons/hi2";
import clsx from "clsx";
import { formatPrice } from "@/utils/curency";
import { format } from "date-fns";
import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { ICheckoutState } from "@/services/store/checkout/checkout.model";
import { setVoucher } from "@/services/store/checkout/checkout.slice";
import { useMemo } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { message } from "antd";
import { useVoucherModal } from "@/hooks/useVoucherModal";

interface VoucherItemProps {
  voucher: IVoucher;
}

const calculateDiscount = (voucher: IVoucher, cartSubTotal: number, shippingFee: number) => {
  if (voucher.voucherType === "FREE_SHIPPING") {
    return Math.min(voucher.discount, shippingFee);
  }

  let discountAmount: number;
  if (voucher.discountTypes === "percentage") {
    discountAmount = (cartSubTotal * voucher.discount) / 100;

    if (voucher.maxReduce) {
      discountAmount = Math.min(discountAmount, voucher.maxReduce);
    }

    return discountAmount;
  } else {
    return Math.min(voucher.discount, cartSubTotal);
  }
};

const VoucherItem = ({ voucher }: VoucherItemProps) => {
  const { state: cartState } = useArchive<ICartInitialState>("cart");
  const { state: checkoutState, dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");
  const { onClose } = useVoucherModal();
  const Icon = voucher.voucherType === "FREE_SHIPPING" ? HiOutlineTruck : HiOutlineTicket;
  const discountText = voucher.discountTypes === "percentage" ? `${voucher.discount}%` : `${formatPrice(voucher.discount)}`;
  const titleText = voucher.voucherType === "FREE_SHIPPING" ? "Miễn phí vận chuyển" : "Giảm giá";

  const isNotEligible = cartState.subTotal < voucher.minimumOrderPrice;

  const handleSelectVoucher = (voucher: IVoucher) => {
    const discountAmount = calculateDiscount(voucher, cartState.subTotal, checkoutState.shipping_fee || 0);
    checkoutDispatch(
      setVoucher({
        ...voucher,
        discount: discountAmount,
      }),
    );
    message.success("Chọn voucher thành công!");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const isSelected = useMemo(() => checkoutState.voucher?.id === voucher.id, [checkoutState.voucher]);

  return (
    <li
      role="button"
      onClick={!isNotEligible ? () => handleSelectVoucher(voucher) : undefined}
      aria-disabled={isNotEligible}
      className={clsx(
        "rounded-lg border border-dashed border-primary-20% p-2 py-4 transition-all duration-300 hover:border-primary-500 hover:shadow-md",
        isNotEligible && "cursor-not-allowed opacity-50",
        isSelected && "border-secondary-900",
      )}
    >
      <div className="grid grid-cols-6 gap-2">
        <div className={clsx("col-span-1 flex flex-col items-center justify-center rounded-md text-primary-500")}>
          <Icon size={30} className="opacity-70" />
          <p className="text-center text-xs font-semibold">{titleText}</p>
        </div>
        <div className="col-span-5 flex items-center justify-between gap-1">
          <div className="flex w-[90%] flex-col justify-between gap-1">
            <p className="text-xs font-medium leading-5">
              {titleText} <strong className="text-orange-400">{discountText}</strong> với đơn hàng có giá trị tối thiểu{" "}
              <strong className="text-orange-400">{formatPrice(voucher.minimumOrderPrice)}</strong>
            </p>

            {/* New section for maxReduce display */}
            {voucher.discountTypes === "percentage" && voucher.maxReduce && (
              <p className="text-xs">
                Giảm tối đa: <strong className="text-orange-400">{formatPrice(voucher.maxReduce)}</strong>
              </p>
            )}

            <p className="text-xs">
              Hạn sử dụng đến: <strong className="text-orange-400">{format(voucher.endDate, "dd/MM/yyyy")}</strong>
            </p>
          </div>
          {!isNotEligible && isSelected && (
            <div className="shrink-0">
              <IoIosCheckmarkCircle size={25} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default VoucherItem;
