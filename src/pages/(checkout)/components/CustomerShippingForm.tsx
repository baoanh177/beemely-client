import { Form, Formik } from "formik";
import { object, string } from "yup";

import FormInput from "@/components/form/FormInput";
import { ICheckoutState, IShippingAddress } from "@/services/store/checkout/checkout.model";
import { useEffect } from "react";
import FormSelect from "@/components/form/FormSelect";
import FormInputArea from "@/components/form/FormInputArea";
import Button from "@/components/common/Button";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { getAllProvinces, getDistrictsByProvinceId, getWardsByDistrictId } from "@/services/store/location/location.thunk";
import { ILocationInitialState, setDistrict, setProvince, setWard } from "@/services/store/location/location.slice";
import { setUseUserAddress } from "@/services/store/checkout/checkout.slice";

interface ICustomerShippingFormProps {
  initialValues: IShippingAddress;
  onSubmit: (data: IShippingAddress) => void;
  next: () => void;
}

const validateSchema = object().shape({
  user_name: string().required("Vui lòng nhập tên người nhận"),
  user_email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  phone_number: string().required("Vui lòng nhập số điện thoại"),
  city: string().required("Vui lòng chọn Tỉnh/Thành phố"),
  district: string().required("Vui lòng chọn Quận/Huyện"),
  commune: string().required("Vui lòng chọn Phường/Xã"),
  detail_address: string().required("Vui lòng nhập địa chỉ chi tiết"),
});

const CustomerShippingForm = ({ initialValues, onSubmit, next }: ICustomerShippingFormProps) => {
  const { state: authState } = useArchive<IAuthInitialState>("auth");
  const { dispatch: checkoutDispatch } = useArchive<ICheckoutState>("checkout");
  const formatedInitialValues: IShippingAddress = {
    ...initialValues,
    user_email: authState.profile?.email || "",
    user_name: authState.profile?.fullName || "",
    phone_number: authState.profile?.phone || "",
  };
  const {
    dispatch,
    state: { districts, provinces, wards },
  } = useArchive<ILocationInitialState>("location");

  useEffect(() => {
    dispatch(getAllProvinces());
  }, [dispatch]);

  const handleLocationChange = (type: "province" | "district" | "ward", id: string | null) => {
    switch (type) {
      case "province":
        if (id) {
          const selectedProvince = provinces?.find((p) => p.ProvinceID === Number(id));
          if (selectedProvince) {
            dispatch(setProvince(selectedProvince));
            dispatch(getDistrictsByProvinceId(id));
          }
        }
        break;
      case "district":
        if (id) {
          const selectedDistrict = districts?.find((d) => d.DistrictID === Number(id));
          if (selectedDistrict) {
            dispatch(setDistrict(selectedDistrict));
            dispatch(getWardsByDistrictId(id));
          }
        }
        break;
      case "ward":
        if (id) {
          const selectedWard = wards?.find((w) => w.WardCode === id);
          if (selectedWard) {
            dispatch(setWard(selectedWard));
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {authState.isLogin && authState.profile?.addresses.length !== 0 && (
        <Button
          text="Sử dụng địa chỉ của tôi"
          variant="secondary"
          className="my-8 h-10"
          onClick={() => checkoutDispatch(setUseUserAddress(true))}
        />
      )}
      <Formik
        validationSchema={validateSchema}
        initialValues={formatedInitialValues}
        validateOnBlur
        onSubmit={(data) => {
          if (validateSchema.validateSync(data)) {
            onSubmit(data);
            next();
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
              <FormInput
                isRequired
                label="Nhập địa chỉ nhà, số nhà, tên đường."
                type="text"
                value={values.detail_address}
                error={(touched.detail_address && errors.detail_address) || ""}
                name="detail_address"
                onChange={(value) => {
                  setFieldValue("detail_address", value);
                }}
                onBlur={handleBlur}
              />
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                <FormSelect
                  options={provinces?.map((p) => ({ value: p.ProvinceID.toString(), label: p.ProvinceName })) || []}
                  isRequired
                  label="Tỉnh/Thành phố"
                  value={values.city}
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={(value) => {
                    setFieldValue("city", value);
                    setFieldValue("district", "");
                    setFieldValue("commune", "");
                    handleLocationChange("province", value as string);
                  }}
                  error={touched.city ? errors.city : ""}
                />
                <FormSelect
                  options={districts?.map((d) => ({ value: d.DistrictID.toString(), label: d.DistrictName })) || []}
                  label="Quận/Huyện"
                  value={values.district}
                  isRequired
                  placeholder="Chọn quận/huyện"
                  isDisabled={!values.city || provinces?.length === 0}
                  onChange={(value) => {
                    setFieldValue("district", value);
                    setFieldValue("commune", "");
                    handleLocationChange("district", value as string);
                  }}
                  error={touched.district ? errors.district : ""}
                />
                <FormSelect
                  options={wards?.map((d) => ({ value: d.WardCode, label: d.WardName })) || []}
                  label="Phường/Xã"
                  value={values.commune}
                  placeholder="Chọn phường/xã"
                  isDisabled={!values.district || wards?.length === 0 || provinces?.length === 0}
                  onChange={(value) => {
                    setFieldValue("commune", value);
                    handleLocationChange("ward", value as string);
                  }}
                  error={touched.commune ? errors.commune : ""}
                />
              </div>
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

export default CustomerShippingForm;
