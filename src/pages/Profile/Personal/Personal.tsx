import Button from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { MdOutlineSaveAlt } from "react-icons/md";

const Personal = () => {
    const { state } = useArchive<IAuthInitialState>('auth');

    return (
        <div>
            <div className="flex justify-between">
                <div className="relative w-fit">
                    <img className="w-[80px] h-[80px] object-cover shrink-0 rounded-full" src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg" alt="Avatar" />
                    <div className="absolute bottom-2 right-0 bg-primary-500 text-white-500 w-[20px] h-[20px] rounded-md flex items-center justify-center">
                        <MdOutlineSaveAlt size={16} />
                    </div>
                </div>
                <Button icon={<MdOutlineSaveAlt />} className="h-[50px]" text="Edit Profile" />
            </div>
            <div className="flex flex-col gap-6 py-10">
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Tên người dùng" />
                        <FormInput value={state.profile?.fullName} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Giới tính" />
                        <FormInput value={state.profile?.gender} />
                    </div>
                </div>
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Số điện thoại" />
                        <FormInput value={state.profile?.phone} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Email" />
                        <FormInput value={state.profile?.email} />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Label text="Địa chỉ" />
                    <div className="flex flex-col gap-4">
                        {state.profile?.addresses?.map((address, index) => (
                            <FormInput
                                key={index}
                                value={`${address.detailAddress}, ${address.commune}, ${address.district}, ${address.city}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
