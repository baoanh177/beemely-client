import { Form, Formik } from "formik";
import { object, string } from "yup";

import FormSelect from "@/components/form/FormSelect";
import Button from "@/components/common/Button";
import { message, Modal } from "antd";
import clsx from "clsx";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { useAddressModal } from "@/hooks/useAddressModal";
import { ILocationInitialState, resetLocationState, setDistrict, setProvince, setWard } from "@/services/store/location/location.slice";
import { getAllProvinces, getDistrictsByProvinceId, getWardsByDistrictId } from "@/services/store/location/location.thunk";
import FormInput from "../form/FormInput";
import { useMemo } from "react";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { editProfile } from "@/services/store/auth/auth.thunk";

import lodash from "lodash";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

export interface IInitialAddressModalValues {
  city: string;
  district: string;
  commune: string;
  detail_address: string;
  default: boolean;
  index: number;
}

interface IAddressModalProps {
  initialValues: IInitialAddressModalValues | null;
}

const validateSchema = object().shape({
  city: string().required("Vui lòng chọn Tỉnh/Thành phố"),
  district: string().required("Vui lòng chọn Quận/Huyện"),
  commune: string().required("Vui lòng chọn Phường/Xã"),
  detail_address: string().required("Vui lòng nhập địa chỉ chi tiết"),
});

const AddressModal = ({ initialValues }: IAddressModalProps) => {
  const {
    state: { profile: userProfile, status },
    dispatch: authDispatch,
  } = useArchive<IAuthInitialState>("auth");

  const userAddresses = useMemo(() => userProfile?.addresses || [], [userProfile?.addresses]);

  const { isOpen, onClose } = useAddressModal();

  const {
    state: { districts, provinces, wards, location },
    dispatch: locationDispatch,
  } = useArchive<ILocationInitialState>("location");

  const { getAllProvinceLoading } = useAsyncEffect((async) => {
    async(locationDispatch(getAllProvinces()), "getAllProvinceLoading");
  }, []);

  const formatedInitialValues = {
    city: initialValues?.city || "",
    district: initialValues?.district || "",
    commune: initialValues?.commune || "",
    detail_address: initialValues?.detail_address || "",
    default: initialValues?.default || false,
    index: initialValues?.index || -1,
  };

  const handleSubmit = (values: IInitialAddressModalValues) => {
    if (values.city && values.commune && values.district && values.detail_address) {
      const formatedDataAddress = userAddresses.map((adr) => ({
        city: adr.city,
        district: adr.district,
        commune: adr.commune,
        detail_address: adr.detailAddress,
        default: adr.default,
      }));

      if (initialValues) {
        if (lodash.isEqual(initialValues, values)) {
          onClose();
          return;
        }

        const dataSubmit = {
          city: location?.province?.ProvinceName || initialValues.city,
          district: location?.district?.DistrictName || initialValues.district,
          commune: location?.ward?.WardName || initialValues.commune,
          detail_address: values.detail_address,
          default: initialValues.default,
        };

        const updatedAddresses = formatedDataAddress.map((item, index) => (index === initialValues.index ? dataSubmit : item));

        authDispatch(
          editProfile({
            body: {
              addresses: [...updatedAddresses],
            },
          }),
        )
          .then(() => {
            message.success("Cập nhật chỉ thành công!");

            locationDispatch(resetLocationState());
            onClose();
          })
          .catch(() => {
            message.error("Cập nhật chỉ thất bại!");
          });
      } else {
        if (location.province && location.district && location.ward) {
          const dataSubmit = {
            city: location.province.ProvinceName,
            district: location.district.DistrictName,
            commune: location.ward.WardName,
            detail_address: values.detail_address,
            default: userAddresses.length === 0 ? true : values.default,
          };

          authDispatch(
            editProfile({
              body: {
                addresses: [...formatedDataAddress, dataSubmit],
              },
            }),
          )
            .then(() => {
              message.success("Thêm địa chỉ thành công!");
              locationDispatch(resetLocationState());
              onClose();
            })
            .catch(() => {
              message.error("Thêm địa chỉ thất bại!");
            });
        }
      }
    } else {
      message.error("Thiếu thông tin!");
    }
  };

  const handleLocationChange = (type: "province" | "district" | "ward", id: string | null) => {
    switch (type) {
      case "province":
        if (id) {
          const selectedProvince = provinces?.find((p) => p.ProvinceID === Number(id));
          if (selectedProvince) {
            locationDispatch(setProvince(selectedProvince));
            locationDispatch(getDistrictsByProvinceId(id));
          }
        }
        break;
      case "district":
        if (id) {
          const selectedDistrict = districts?.find((d) => d.DistrictID === Number(id));
          if (selectedDistrict) {
            locationDispatch(setDistrict(selectedDistrict));
            locationDispatch(getWardsByDistrictId(id));
          }
        }
        break;
      case "ward":
        if (id) {
          const selectedWard = wards?.find((w) => w.WardCode === id);
          if (selectedWard) {
            locationDispatch(setWard(selectedWard));
          }
        }
        break;
      default:
        break;
    }
  };
  console.log(location);

  return (
    <Modal className={clsx("")} open={isOpen} loading={getAllProvinceLoading} centered onCancel={onClose} footer={null}>
      <Formik
        validationSchema={validateSchema}
        initialValues={formatedInitialValues}
        validateOnBlur
        onSubmit={(data) => {
          handleSubmit(data);
        }}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
          return (
            <Form className="mt-6 flex flex-col gap-4 text-base" onSubmit={handleSubmit}>
              <FormInput
                isRequired
                label="Nhập địa chỉ chi tiết"
                type="text"
                value={values.detail_address}
                error={(touched.detail_address && errors.detail_address) || ""}
                name="detail_address"
                onChange={(value) => {
                  setFieldValue("detail_address", value);
                }}
                onBlur={handleBlur}
              />
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
                isDisabled={(!!initialValues && !location.province) || !values.city || provinces?.length === 0}
                onChange={(value) => {
                  setFieldValue("district", value);
                  setFieldValue("commune", "");
                  handleLocationChange("district", value as string);
                }}
                error={touched.district ? errors.district : ""}
              />
              <FormSelect
                isRequired
                options={wards?.map((d) => ({ value: d.WardCode, label: d.WardName })) || []}
                label="Phường/Xã"
                value={values.commune}
                placeholder="Chọn phường/xã"
                isDisabled={(!!initialValues && !location.district) || !values.district || wards?.length === 0 || provinces?.length === 0}
                onChange={(value) => {
                  setFieldValue("commune", value);
                  handleLocationChange("ward", value as string);
                }}
                error={touched.commune ? errors.commune : ""}
              />
              <div className="flex justify-end gap-4">
                <Button onClick={onClose} text="Hủy" variant="secondary" isDisabled={status === EFetchStatus.PENDING} />
                <Button
                  text={initialValues ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                  type="submit"
                  variant="primary"
                  isLoading={status === EFetchStatus.PENDING}
                  isDisabled={status === EFetchStatus.PENDING}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddressModal;
