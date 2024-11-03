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
    const { state, dispatch } = useArchive<IAuthInitialState>('auth');
    const [fullName, setFullName] = useState<string>(state.profile?.fullName || "");
    const [phone, setPhone] = useState<string>(state.profile?.phone || "");
    const [email, setEmail] = useState<string>(state.profile?.email || "");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [avatar, setAvatar] = useState<string>(state.profile?.avatarUrl || "");

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleUploadImage = (imageUrl: string | string[]) => {
        setAvatar(Array.isArray(imageUrl) ? imageUrl[0] : imageUrl);
        handleCloseModal();
    };

    useEffect(() => {
        setFullName(state.profile?.fullName || "");
        setPhone(state.profile?.phone || "");
        setEmail(state.profile?.email || "");
        setAvatar(state.profile?.avatarUrl || "");
    }, [state.profile]);

    const handleEditProfile = () => {
        const updatedProfile = {
            full_name: fullName,
            gender: state.profile?.gender,
            avatar_url: avatar
        };
        dispatch(editProfile({ body: updatedProfile }));
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="relative w-fit">
                    <img
                        className="w-[80px] h-[80px] object-cover shrink-0 rounded-full"
                        src={state.profile?.avatarUrl}
                        alt="Avatar"
                    />
                    <div
                        className="absolute bottom-2 right-0 bg-primary-500 text-white-500 w-[20px] h-[20px] rounded-md flex items-center justify-center cursor-pointer"
                        onClick={handleOpenModal}
                    >
                        <MdOutlineSaveAlt size={16} />
                    </div>
                </div>
                <Modal
                    title="Tải lên hình ảnh"
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    <UploadImage currentImageUrl={state.profile?.avatarUrl} onImageUpload={handleUploadImage} />
                </Modal>
                <Button icon={<MdOutlineSaveAlt />} className="h-[50px]" text="Edit Profile" onClick={handleEditProfile} />
            </div>
            <div className="flex flex-col gap-6 py-10">
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Tên người dùng" />
                        <FormInput value={fullName} onChange={(e) => setFullName(e as string)} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Giới tính" />
                        <div className="flex gap-4">
                            {(Object.keys(EGender) as Array<keyof typeof EGender>).map((key, index) => (
                                <FormCheck
                                    key={index}
                                    type="radio"
                                    label={EGender[key]}
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
