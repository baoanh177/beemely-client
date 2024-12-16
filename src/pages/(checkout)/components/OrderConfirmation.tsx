import { useMemo } from "react";
import { ICheckoutState } from "@/services/store/checkout/checkout.model";
import { useArchive } from "@/hooks/useArchive";
import { PAYMENT_METHODS, setCurrentStep } from "@/services/store/checkout/checkout.slice";
import { FiEdit } from "react-icons/fi";
import CartList from "./CartList";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import { ILocationInitialState } from "@/services/store/location/location.slice";

export const OrderConfirmation = () => {
  const { state: checkoutState, dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");
  const { state: locationState } = useArchive<ILocationInitialState>("location");

  const formatedAddress = useMemo(
    () =>
      checkoutState.isUseUserAddress
        ? `${checkoutState.shippingAddress.detail_address} - ${checkoutState.shippingAddress.commune} - ${checkoutState.shippingAddress.district} - ${checkoutState.shippingAddress.city}`
        : `${checkoutState.shippingAddress.detail_address}, ${locationState.location.ward?.WardName}, ${locationState.location.district?.DistrictName}, ${locationState.location.province?.ProvinceName}`,
    [checkoutState.shippingAddress, locationState.location],
  );
  const curentPaymentMethod = PAYMENT_METHODS.find((item) => item.value === checkoutState.paymentType);

  return (
    <div className="flex flex-col gap-6">
      <CartList />
      <div className="space-y-2 border-b border-primary-10% py-2 text-sm font-medium">
        <Title text="Thông tin giao hàng" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-1">
            <p>{checkoutState.shippingAddress.user_name}</p>
            <p>{checkoutState.shippingAddress.user_email}</p>
            <p>{checkoutState.shippingAddress.phone_number}</p>
            <p>{formatedAddress}</p>
            <p>{checkoutState.shippingAddress.note}</p>
          </div>
          <Button onClick={() => checkoutDispatch(setCurrentStep(0))} icon={<FiEdit className="h-4 w-4" />} variant="secondary" />
        </div>
      </div>
      <div className="space-y-4 border-b border-primary-10% py-2">
        <Title text="Phương thức thanh toán" />
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img src={curentPaymentMethod?.image} className="h-16 w-28" />
            <p>{curentPaymentMethod?.label}</p>
          </div>
          <Button onClick={() => checkoutDispatch(setCurrentStep(1))} icon={<FiEdit className="h-4 w-4" />} variant="secondary" />
        </div>
      </div>
    </div>
  );
};
