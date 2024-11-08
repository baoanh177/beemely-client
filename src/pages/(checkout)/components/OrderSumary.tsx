import { useArchive } from "@/hooks/useArchive";
import { useShippingFee } from "@/hooks/useShipping";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { ICheckoutState } from "@/services/store/checkout/checkout.model";
import { formatPrice } from "@/utils/curency";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { Card, message } from "antd";
import { useMemo } from "react";
import { getAddress } from "./data/dataForm";
import { createNewOrder } from "@/services/store/order/order.thunk";
import CartList from "./CartList";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import Button from "@/components/common/Button";
import { HiOutlineTicket } from "react-icons/hi2";
import { MdNavigateNext } from "react-icons/md";
import { useVoucherModal } from "@/hooks/useVoucherModal";

const OrderSummary = () => {
  const { state: cartState } = useArchive<ICartInitialState>("cart");
  const { state: checkoutState } = useArchive<ICheckoutState>("checkout");
  const { dispatch, state: orderState } = useArchive<IOrderInitialState>("order");
  const { isLoading, shippingFee, error } = useShippingFee();

  const { onOpen } = useVoucherModal();

  const discountPrice = useMemo(() => checkoutState.discount_price || 0, [checkoutState.discount_price]);
  const totalPrice = useMemo(
    () => cartState.subTotal + (shippingFee || 0) - discountPrice,
    [cartState.cart?.cartItems, shippingFee, checkoutState.discount_price],
  );

  const isValidAddress = useMemo(() => {
    const { user_name, phone_number, user_email, city, district, commune, detail_address } = checkoutState.shippingAddress;

    return (
      user_name.trim() !== "" &&
      phone_number.trim() !== "" &&
      user_email.trim() !== "" &&
      city.trim() !== "" &&
      district.trim() !== "" &&
      commune.trim() !== "" &&
      detail_address.trim() !== ""
    );
  }, [checkoutState.shippingAddress]);

  const handleCheckout = async () => {
    if (!isValidAddress) {
      message.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    if (!checkoutState.paymentType) {
      message.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (cartState.subTotal <= 0) {
      message.error("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (isLoading || !shippingFee) {
      message.error("Đang tính phí vận chuyển. Vui lòng đợi!");
      return;
    }

    const formatedAddress = getAddress(
      checkoutState.shippingAddress.city,
      checkoutState.shippingAddress.district,
      checkoutState.shippingAddress.commune,
    );

    const cartItemsFormated = cartState.cart?.cartItems.map((item) => ({
      product_id: item.product.id,
      variant_id: item.variant.id,
      quantity: item.quantity,
    }));

    const orderData = {
      items: cartItemsFormated,
      user_name: checkoutState.shippingAddress.user_name,
      user_email: checkoutState.shippingAddress.user_email,
      shipping_address: `${checkoutState.shippingAddress.detail_address}, ${formatedAddress}`,
      payment_type: checkoutState.paymentType,
      shipping_fee: shippingFee,
      phone_number: checkoutState.shippingAddress.phone_number,
      total_price: totalPrice,
      discount_price: discountPrice,
      regular_total_price: cartState.subTotal,
      note: checkoutState.shippingAddress.note || "",
      voucher: checkoutState.voucher?.id || "",
    };

    console.log(orderData);
    try {
      const { metaData } = await dispatch(createNewOrder({ body: orderData })).unwrap();

      if (metaData.checkoutUrl) {
        window.location.href = metaData.checkoutUrl;
      }
    } catch (err) {
      message.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  return (
    <Card title="Thông tin đơn hàng" className="rounded-xl border border-primary-10% px-4 py-5 shadow-md" bordered={false}>
      {checkoutState.currentStep < 2 && <CartList />}
      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-bold text-primary-500">
            <p>Giá tạm tính</p>
            <p>{formatPrice(cartState.subTotal)}</p>
          </div>

          <div className="group -m-px flex justify-between text-sm text-primary-200" role="button" onClick={onOpen}>
            <p className="flex items-center space-x-2">
              <HiOutlineTicket className="mr-2 h-4 w-4" /> Voucher
            </p>
            <p className="flex items-end space-x-2 group-hover:underline">
              Chọn mã giảm giá <MdNavigateNext className="h-4 w-4" />
            </p>
          </div>

          <div className="flex justify-between text-sm text-primary-200">
            <p>Giảm giá</p>
            <p>{formatPrice(discountPrice)}</p>
          </div>

          <div className="flex justify-between text-sm text-primary-200">
            <p>Phí vận chuyển</p>
            {isLoading ? <p>Đang tính...</p> : error ? <p className="text-red-500">Lỗi tính phí</p> : <p>{formatPrice(shippingFee || 0)}</p>}
          </div>

          {checkoutState.shippingAddress.note && (
            <div className="text-sm text-primary-200">
              <p className="font-medium">Ghi chú:</p>
              <p className="italic">{checkoutState.shippingAddress.note}</p>
            </div>
          )}
        </div>

        <div className="border-t border-primary-10% pt-4">
          <div className="flex justify-between text-base font-bold text-primary-500">
            <p>Tổng cộng</p>
            <p>{formatPrice(totalPrice)}</p>
          </div>
        </div>

        {checkoutState.currentStep === 2 && (
          <Button
            isLoading={orderState.status === EFetchStatus.PENDING}
            text="Đặt hàng ngay"
            size="full"
            onClick={handleCheckout}
            isDisabled={isLoading || !isValidAddress || !checkoutState.paymentType || orderState.status === EFetchStatus.PENDING}
          />
        )}
      </div>
    </Card>
  );
};

export default OrderSummary;
