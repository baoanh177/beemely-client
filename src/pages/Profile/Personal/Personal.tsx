import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { MdOutlineSaveAlt } from "react-icons/md";
import { EGender } from "@/shared/enums/genders";
import { editProfile } from "@/services/store/auth/auth.thunk";
import FormCheck from "@/components/form/FormCheck";
import UploadImage from "@/components/form/UploadImage";
import { Modal } from "antd";

const Personal = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const [fullName, setFullName] = useState<string>(state.profile?.fullName || "");
  const [phone, setPhone] = useState<string>(state.profile?.phone || "");
  const [email, setEmail] = useState<string>(state.profile?.email || "");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUploadImage = (imageUrl: string | string[]) => {
    dispatch(editProfile({ body: { avatar_url: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl } }));
    handleCloseModal();
  };

  useEffect(() => {
    setFullName(state.profile?.fullName || "");
    setPhone(state.profile?.phone || "");
    setEmail(state.profile?.email || "");
  }, [state.profile]);

  const handleEditProfile = () => {
    const updatedProfile = {
      full_name: fullName,
      gender: state.profile?.gender,
      phone: phone,
    };
    dispatch(editProfile({ body: updatedProfile }));
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="relative w-fit">
          {state.profile?.avatarUrl ? (
            <img className="h-[80px] w-[80px] shrink-0 rounded-full object-cover" src={state.profile?.avatarUrl} alt="Avatar" />
          ) :(
          <div className="h-[80px] w-[80px] shrink-0 rounded-full object-cover font-bold flex text-xl items-center justify-center bg-blue-500">
              {state.profile?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div
            className="absolute bottom-2 right-0 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md bg-primary-500 text-white-500"
            onClick={handleOpenModal}
          >
            <MdOutlineSaveAlt size={16} />
          </div>
        </div>
        <Modal title="Tải lên hình ảnh" open={isModalVisible} onCancel={handleCloseModal} footer={null}>
          <UploadImage currentImageUrl={state.profile?.avatarUrl} onImageUpload={handleUploadImage} />
        </Modal>
        <Button icon={<MdOutlineSaveAlt />} className="h-[50px]" text="Cập nhật" onClick={handleEditProfile} />
      </div>
      <div className="flex flex-col gap-6 py-10">
          <div className="flex w-full gap-4">
            <Label text="Giới tính: " />
            <div className="flex gap-6">
              {(Object.keys(EGender) as Array<keyof typeof EGender>).map((key, index) => (
                <FormCheck
                  key={index}
                  type="radio"
                  label={EGender[key]}
                  id={EGender[key]}
                  name="gender"
                  checked={state.profile?.gender === EGender[key]}
                  value={EGender[key]}
                  onChange={() => {
                    dispatch(editProfile({ body: { gender: EGender[key] } }));
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label text="Tên người dùng" />
            <FormInput value={fullName} onChange={(e) => setFullName(e as string)} />
          </div>
        <div className="flex flex-col gap-1">
          <Label text="Số điện thoại" />
          <FormInput value={phone} onChange={(e) => setPhone(e as string)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="Email" />
          <FormInput isDisabled value={email} onChange={(e) => setEmail(e as string)} />
        </div>
      </div>
    </div>
  );
};

export default Personal;
