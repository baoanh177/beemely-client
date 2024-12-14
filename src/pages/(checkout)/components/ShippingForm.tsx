import { useArchive } from "@/hooks/useArchive";
import { ICheckoutState, IShippingAddress } from "@/services/store/checkout/checkout.model";
import CustomerShippingForm from "./CustomerShippingForm";
import UserAddressShippingForm from "./UserAddressShippingForm";
import { setUseUserAddress } from "@/services/store/checkout/checkout.slice";
import { useEffect } from "react";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";

interface IShippingFormProps {
  initialValues: IShippingAddress;
  onSubmit: (data: IShippingAddress) => void;
  next: () => void;
}

const ShippingForm = ({ initialValues, onSubmit, next }: IShippingFormProps) => {
  const { state: checkoutState, dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");
  const { state: authState } = useArchive<IAuthInitialState>("auth");

  useEffect(() => {
    if (!authState.profile?.addresses?.length) {
      checkoutDispatch(setUseUserAddress(false));
    }
  }, [authState.profile?.addresses.length]);

  return (
    <div>
      {checkoutState.isUseUserAddress && authState.profile?.addresses.length !== 0 ? (
        <UserAddressShippingForm next={next} />
      ) : (
        <CustomerShippingForm initialValues={initialValues} onSubmit={onSubmit} next={next} />
      )}
    </div>
  );
};

export default ShippingForm;
