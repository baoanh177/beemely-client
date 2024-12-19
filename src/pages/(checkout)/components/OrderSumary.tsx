import { useEffect, useMemo } from "react";
import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { ICheckoutState } from "@/services/store/checkout/checkout.model";
import { formatPrice } from "@/utils/curency";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { Card, message } from "antd";
import { createNewOrder } from "@/services/store/order/order.thunk";
import CartList from "./CartList";
import { EActiveStatus, EFetchStatus } from "@/shared/enums/fetchStatus";
import Button from "@/components/common/Button";
import { HiOutlineTicket } from "react-icons/hi2";
import { MdNavigateNext } from "react-icons/md";
import { ILocationInitialState } from "@/services/store/location/location.slice";
import { setShippingFee, resetVoucher } from "@/services/store/checkout/checkout.slice";
import { useVoucherModal } from "@/hooks/useVoucherModal";
import { useShippingFee } from "@/hooks/useShipping";
import { getCartByUser } from "@/services/store/cart/cart.thunk";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";

const OrderSummary = () => {
  const { state: cartState, dispatch: cartDispatch } = useArchive<ICartInitialState>("cart");
  const { state: checkoutState, dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");
  const { dispatch, state: orderState } = useArchive<IOrderInitialState>("order");
  const { state: authState } = useArchive<IAuthInitialState>("auth");
  const { state: locationState } = useArchive<ILocationInitialState>("location");

  const { shippingFee, isLoading, refetch } = useShippingFee();
  const { onOpen } = useVoucherModal();

  const discountPrice = checkoutState.discount_price || 0;

  const totalPrice = useMemo(() => {
    return cartState.subTotal + (checkoutState.shipping_fee || 0) - discountPrice;
  }, [cartState.subTotal, checkoutState.shipping_fee, discountPrice]);

  const isValidAddress = useMemo(() => {
    const { user_name, phone_number, user_email, city, district, commune, detail_address } = checkoutState.shippingAddress;
    const { location: dataLocation } = locationState;

    const baseConditions =
      user_name.trim() !== "" &&
      phone_number.trim() !== "" &&
      user_email.trim() !== "" &&
      city.trim() !== "" &&
      district.trim() !== "" &&
      commune.trim() !== "" &&
      detail_address.trim() !== "";

    if (checkoutState.isUseUserAddress) {
      return baseConditions;
    }

    return baseConditions && dataLocation.province && dataLocation.district && dataLocation.ward;
  }, [checkoutState.shippingAddress, locationState.location]);

  const hasOutStockProduct = useMemo(() => {
    return !!cartState.cart?.cartItems.find((item) => item.variant.stock === 0 || item.product.status === EActiveStatus.INACTIVE);
  }, [cartState.cart?.cartItems]);

  const handleCheckout = async () => {
    if (!authState.isLogin) {
      message.error("Bạn phải đăng nhập mới có thể mua hàng!");
      return;
    }

    if (!isValidAddress) {
      message.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }
    if (hasOutStockProduct) {
      message.error("Vui lòng xóa sản phẩm đã hết hàng khỏi giỏ hàng");
      await cartDispatch(getCartByUser()).unwrap();
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

    if (!checkoutState.shipping_fee) {
      message.error("Đang tính phí vận chuyển. Vui lòng đợi!");
      return;
    }

    const { detail_address } = checkoutState.shippingAddress;
    const { location: dataLocation } = locationState;
    const formattedAddress = checkoutState.isUseUserAddress
      ? `${detail_address} - ${checkoutState.shippingAddress.commune} - ${checkoutState.shippingAddress.district} - ${checkoutState.shippingAddress.city}`
      : `${detail_address}, ${dataLocation.ward?.WardName}, ${dataLocation.district?.DistrictName}, ${dataLocation.province?.ProvinceName}`;

    const cartItemsFormatted = cartState.cart?.cartItems.map((item) => ({
      product_id: item.product.id,
      variant_id: item.variant.id,
      quantity: item.quantity,
    }));

    const orderData = {
      items: cartItemsFormatted,
      user_name: checkoutState.shippingAddress.user_name,
      user_email: checkoutState.shippingAddress.user_email,
      shipping_address: formattedAddress,
      payment_type: checkoutState.paymentType,
      shipping_fee: checkoutState.shipping_fee,
      phone_number: checkoutState.shippingAddress.phone_number,
      total_price: totalPrice,
      discount_price: discountPrice,
      regular_total_price: cartState.subTotal,
      note: checkoutState.shippingAddress.note || "",
      voucher: checkoutState.voucher?.id || null,
    };

    console.log(orderData);

    try {
      const { metaData } = await dispatch(createNewOrder({ body: orderData })).unwrap();
      if (metaData.checkoutUrl) {
        window.location.href = metaData.checkoutUrl;
      }
    } catch (error: any) {
      const errorMessage = error.errors.message || "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!";
      await cartDispatch(getCartByUser()).unwrap();
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    checkoutDispatch(resetVoucher());
  }, [cartState.cart?.cartItems]);

  useEffect(() => {
    if (checkoutState.isUseUserAddress) {
      refetch();
    }
  }, [checkoutState.isUseUserAddress]);

  useEffect(() => {
    if (shippingFee) {
      checkoutDispatch(setShippingFee(shippingFee));
    }
  }, [shippingFee, checkoutDispatch]);

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
            {checkoutState.voucher ? (
              <p className="flex items-end space-x-2 text-sm group-hover:underline">
                {checkoutState.voucher.name}
                {checkoutState.voucher.discountTypes === "percentage" && checkoutState.voucher.maxReduce && (
                  <span className="ml-1 text-gray-500">(Tối đa {formatPrice(checkoutState.voucher.maxReduce)})</span>
                )}
              </p>
            ) : (
              <p className="flex items-end space-x-2 group-hover:underline">
                Chọn mã giảm giá <MdNavigateNext className="h-4 w-4" />
              </p>
            )}
          </div>

          <div className="flex justify-between text-sm text-primary-200">
            <p>Phí vận chuyển</p>
            {isLoading ? <p>Đang tính...</p> : <p>{formatPrice(shippingFee || 0)}</p>}
          </div>
          <div className="flex justify-between text-sm text-primary-200">
            <p>{checkoutState.voucher ? "Mã khuyến mãi" : "Chưa áp dụng mã giảm giá"}</p>
            <p>
              {discountPrice ? "-" : ""}
              {discountPrice ? formatPrice(discountPrice) : "0 VND"}
            </p>
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
            isDisabled={
              checkoutState.status === EFetchStatus.PENDING ||
              !isValidAddress ||
              hasOutStockProduct ||
              !checkoutState.paymentType ||
              orderState.status === EFetchStatus.PENDING
            }
          />
        )}
      </div>
    </Card>
  );
};

export default OrderSummary;
