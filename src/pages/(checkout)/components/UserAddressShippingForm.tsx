import { Form, Formik } from "formik";
import { object, string } from "yup";

import FormInput from "@/components/form/FormInput";
import { ICheckoutState, IShippingAddress } from "@/services/store/checkout/checkout.model";
import { useEffect, useState } from "react";
import FormInputArea from "@/components/form/FormInputArea";
import Button from "@/components/common/Button";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { IAddress } from "@/services/store/auth/auth.model";
import AddressItem from "./AddressItem";
import { setShippingAddress, setUseUserAddress } from "@/services/store/checkout/checkout.slice";

interface IUserAddressShippingFormProps {
  next: () => void;
}

const validateSchema = object().shape({
  user_name: string().required("Vui lòng nhập tên người nhận"),
  user_email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  phone_number: string().required("Vui lòng nhập số điện thoại"),
  note: string(),
});

const UserAddressShippingForm = ({ next }: IUserAddressShippingFormProps) => {
  const { state: authState } = useArchive<IAuthInitialState>("auth");
  const { state: checkoutState, dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");

  const [currentAddress, setCurrentAddress] = useState<IAddress | undefined>(
    authState.profile?.addresses.find(
      (adr) =>
        adr.city === checkoutState.shippingAddress.city &&
        adr.commune === checkoutState.shippingAddress.commune &&
        checkoutState.shippingAddress.district === adr.district,
    ) ||
      authState.profile?.addresses.find((adr) => adr.default) ||
      undefined,
  );

  const formatedInitialValues = {
    user_email: authState.profile?.email || "",
    user_name: authState.profile?.fullName || "",
    phone_number: authState.profile?.phone || "",
    note: "",
  };

  useEffect(() => {
    if (currentAddress) {
      checkoutDispatch(
        setShippingAddress({
          ...checkoutState.shippingAddress,
          note: "",
          city: currentAddress.city || "",
          commune: currentAddress.commune || "",
          district: currentAddress.district || "",
          detail_address: currentAddress.detailAddress || "",
        }),
      );
    }
  }, [currentAddress]);

  const handleSubmit = (values: IShippingAddress) => {
    console.log(values);
    checkoutDispatch(setShippingAddress(values)), next();
  };

  return (
    <>
      {authState.profile?.addresses?.length && (
        <>
          <div className="my-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
            {authState.profile.addresses.map((address) => (
              <AddressItem item={address} key={address.id} isSelected={currentAddress?.id === address.id} setAddress={setCurrentAddress} />
            ))}
          </div>
          <Button
            text="Nhập địa chỉ khác"
            variant="secondary"
            className="my-8 h-10"
            onClick={() => checkoutDispatch(setUseUserAddress(false))}
          />
        </>
      )}
      <Formik
        validationSchema={validateSchema}
        initialValues={formatedInitialValues}
        validateOnBlur
        onSubmit={(data) => {
          if (validateSchema.validateSync(data)) {
            handleSubmit({
              ...data,
              city: currentAddress?.city as string,
              commune: currentAddress?.commune as string,
              district: currentAddress?.district as string,
              detail_address: currentAddress?.detailAddress as string,
            });
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
          return (
            <Form className="flex flex-col gap-4 text-base" onSubmit={handleSubmit}>
              <FormInput
                isRequired
                label="Nhập Email"
                type="text"
                value={values.user_email}
                error={(touched.user_email && errors.user_email) || ""}
                name="user_email"
                onChange={(value) => {
                  setFieldValue("user_email", value);
                }}
                onBlur={handleBlur}
              />
              <FormInput
                isRequired
                label="Nhập tên người nhận"
                type="text"
                value={values.user_name}
                error={(touched.user_name && errors.user_name) || ""}
                name="user_name"
                onChange={(value) => {
                  setFieldValue("user_name", value);
                }}
                onBlur={handleBlur}
              />
              <FormInput
                isRequired
                label="Điện thoại người nhận"
                type="text"
                value={values.phone_number}
                error={(touched.phone_number && errors.phone_number) || ""}
                name="phone_number"
                onChange={(value) => {
                  setFieldValue("phone_number", value);
                }}
                onBlur={handleBlur}
              />
              <FormInputArea
                label="Ghi chú cho người bán"
                placeholder="Nhập ghi chú..."
                name="note"
                className="w-full"
                value={values.note}
                error={touched.note ? errors.note : ""}
                onChange={(e) => setFieldValue("note", e)}
              />
              <div className="flex justify-end">
                <Button text="Tiếp tục" type="submit" variant="primary" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserAddressShippingForm;
