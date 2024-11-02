import { useArchive } from "@/hooks/useArchive";
import { useShippingFee } from "@/hooks/useShipping";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { ICheckoutState } from "@/services/store/checkout/checkout.model";
import { formatPrice } from "@/utils/curency";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { Card, message } from "antd";
import { useMemo } from "react";
import { createNewOrder } from "@/services/store/order/order.thunk";
import CartList from "./CartList";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import Button from "@/components/common/Button";
import { ILocationInitialState } from "@/services/store/location/location.slice";

const OrderSummary = () => {
  const { state: cartState } = useArchive<ICartInitialState>("cart");
  const { state: checkoutState } = useArchive<ICheckoutState>("checkout");
  const { dispatch, state: orderState } = useArchive<IOrderInitialState>("order");
  const { state: locationState } = useArchive<ILocationInitialState>("location");
  const { isLoading, shippingFee, error } = useShippingFee();

  const discountPrice = checkoutState.discount_price || 0;
  const totalPrice = useMemo(() => cartState.subTotal + (shippingFee || 0) - discountPrice, [cartState.cart?.cartItems, shippingFee]);

  const isValidAddress = useMemo(() => {
    const { user_name, phone_number, user_email, city, district, commune, detail_address } = checkoutState.shippingAddress;
    const { location: dataLocation } = locationState;
    return (
      user_name.trim() !== "" &&
      phone_number.trim() !== "" &&
      user_email.trim() !== "" &&
      city.trim() !== "" &&
      district.trim() !== "" &&
      commune.trim() !== "" &&
      detail_address.trim() !== "" &&
      dataLocation.province &&
      dataLocation.district &&
      dataLocation.ward
    );
  }, [checkoutState.shippingAddress, locationState.location]);

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
    const { detail_address } = checkoutState.shippingAddress;
    const { location: dataLocation } = locationState;
    const formatedAddress = `${detail_address}, ${dataLocation.ward?.WardName}, ${dataLocation.district?.DistrictName}, ${dataLocation.province?.ProvinceName}`;

    const cartItemsFormated = cartState.cart?.cartItems.map((item) => ({
      product_id: item.product.id,
      variant_id: item.variant.id,
      quantity: item.quantity,
    }));

    const orderData = {
      items: cartItemsFormated,
      user_name: checkoutState.shippingAddress.user_name,
      user_email: checkoutState.shippingAddress.user_email,
      shipping_address: formatedAddress,
      payment_type: checkoutState.paymentType,
      shipping_fee: shippingFee,
      phone_number: checkoutState.shippingAddress.phone_number,
      total_price: totalPrice,
      discount_price: discountPrice,
      regular_total_price: cartState.subTotal,
      note: checkoutState.shippingAddress.note || "",
    };

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
