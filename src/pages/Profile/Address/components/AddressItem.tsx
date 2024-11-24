import Button from "@/components/common/Button";
import FormCheck from "@/components/form/FormCheck";
import { useAddressModal } from "@/hooks/useAddressModal";
import { useArchive } from "@/hooks/useArchive";
import { IAddress } from "@/services/store/auth/auth.model";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { editProfile } from "@/services/store/auth/auth.thunk";
import { message, Modal } from "antd";
import { useMemo } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { PiAddressBook } from "react-icons/pi";

import { FiEdit } from "react-icons/fi";

const { confirm } = Modal;

interface AddressItemProps {
  item: IAddress;
  index: number;
}

const AddressItem = ({ item, index }: AddressItemProps) => {
  const { state, dispatch: authDispatch } = useArchive<IAuthInitialState>("auth");
  const { onOpen } = useAddressModal();
  const userAddresses = useMemo(() => state.profile?.addresses || [], [state.profile?.addresses]);

  const handleDeleteAddress = (index: any) => {
    const updatedAddresses = [...userAddresses]
      .filter((_, i) => i !== index)
      .map((address) => {
        return {
          commune: address.commune,
          district: address.district,
          city: address.city,
          detail_address: address.detailAddress,
          default: address.default,
        };
      });

    const updatedProfile = {
      addresses: updatedAddresses,
    };

    authDispatch(editProfile({ body: updatedProfile }))
      .then(() => {
        message.success("Xóa địa chỉ thành công!");
      })
      .catch(() => {
        message.error("Xóa địa chỉ thất bại!");
      });
  };

  const handleChangeDefaultAddress = (index: number) => {
    const updatedAddresses = userAddresses.map((address, idx) => {
      return {
        commune: address.commune,
        district: address.district,
        city: address.city,
        detail_address: address.detailAddress,
        default: idx === index ? true : false,
      };
    });

    const updatedProfile = {
      addresses: updatedAddresses,
    };

    authDispatch(editProfile({ body: updatedProfile }))
      .then(() => {
        message.success("Cập nhật thành công!");
      })
      .catch(() => {
        message.error("Cập nhật thất bại!");
      });
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 rounded-md bg-primary-5% bg-opacity-40 p-5 md:flex-nowrap md:items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <PiAddressBook size={18} />
          <p className="line-clamp-2 text-sm font-semibold lg:text-base">{`${item.detailAddress}, ${item.commune}, ${item.district}, ${item.city}`}</p>
        </div>
        {state.profile?.phone && (
          <div className="flex items-center gap-2">
            <FiPhoneCall size={18} /> <p className="line-clamp-2 text-sm font-semibold lg:text-base">{state.profile?.phone}</p>
          </div>
        )}
        <FormCheck
          label="Địa chỉ mặc định"
          id={item.id}
          checked={item.default}
          onChange={() => handleChangeDefaultAddress(index)}
          type="checkbox"
        />
      </div>
      <div className="flex flex-row gap-4 sm:flex-col">
        <Button
          icon={<FiEdit size={15} />}
          variant="secondary"
          shape="rectangle"
          onClick={() =>
            onOpen({
              commune: item.commune,
              city: item.city,
              district: item.district,
              default: item.default,
              detail_address: item.detailAddress,
              index: index,
            })
          }
        />
        <Button
          icon={<BsTrash3 size={15} />}
          variant="danger"
          onClick={() => {
            confirm({
              centered: true,
              okButtonProps: { style: { backgroundColor: "#FF0000", borderColor: "#FF0000" } },
              title: "Xoá địa chỉ",
              content: "Bạn có chắc chắn muốn xóa địa chỉ này không?",
              onOk: () => handleDeleteAddress(index),
              okText: "Xóa",
              cancelText: "Không",
            });
          }}
        />
      </div>
    </div>
  );
};

export default AddressItem;
