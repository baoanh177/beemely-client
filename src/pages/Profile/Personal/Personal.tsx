import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IDistrict, IProvince, provinces } from "./provinces";
import FormSelect from "@/components/common/Input/FormSelect";
import { EGender } from "@/shared/enums/genders";
import { editProfile } from "@/services/store/auth/auth.thunk";
import FormCheck from "@/components/form/FormCheck";

const Personal = () => {
    const { state, dispatch } = useArchive<IAuthInitialState>('auth');
    const [selectedProvince, setSelectedProvince] = useState<string | undefined>(state.profile?.addresses[0].province);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(state.profile?.addresses[0].district);
    const [selectedCommune, setSelectedCommune] = useState<string | undefined>(state.profile?.addresses[0].commune);
    const [fullName, setFullName] = useState<string>(state.profile?.fullName || "");
    const [phone, setPhone] = useState<string>(state.profile?.phone || "");
    const [email, setEmail] = useState<string>(state.profile?.email || "");

    useEffect(() => {
        setSelectedProvince(state.profile?.addresses[0].province);
        setSelectedDistrict(state.profile?.addresses[0].district);
        setSelectedCommune(state.profile?.addresses[0].commune);
        setFullName(state.profile?.fullName || "");
        setPhone(state.profile?.phone || "");
        setEmail(state.profile?.email || "");
    }, [state.profile]);

    const handleProvinceChange = (value: string | string[]) => {
        setSelectedProvince(value as string);
        setSelectedDistrict(undefined);
        setSelectedCommune(undefined);
    };

    const handleDistrictChange = (value: string | string[]) => {
        setSelectedDistrict(value as string);
        setSelectedCommune(undefined);
    };

    const selectedDistrictOptions = provinces.find((p: IProvince) => p.idProvince === selectedProvince)?.districts || [];
    const selectedCommuneOptions = selectedDistrictOptions.find((d: IDistrict) => d.idDistrict === selectedDistrict)?.communes || [];

    const districtOptions = selectedDistrictOptions.map((district: IDistrict) => ({
        value: district.idDistrict,
        label: district.name,
    }));

    const communeOptions = selectedCommuneOptions.map((commune: any) => ({
        value: commune.idCommune,
        label: commune.name,
    }));

    const provinceOptions = provinces.map((province: any) => ({
        value: province.idProvince,
        label: province.name,
    }));

    const handleEditProfile = () => {
        const updatedProfile = {
            fullName,
            phone,
            email,
            province: selectedProvince,
            district: selectedDistrict,
            commune: selectedCommune,
            gender: state.profile?.gender
        };
        dispatch(editProfile({ body: updatedProfile })
        )
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="relative w-fit">
                    <img className="w-[80px] h-[80px] object-cover shrink-0 rounded-full" src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg" alt="Avatar" />
                    <div className="absolute bottom-2 right-0 bg-primary-500 text-white-500 w-[20px] h-[20px] rounded-md flex items-center justify-center">
                        <MdOutlineSaveAlt size={16} />
                    </div>
                </div>
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
                            {(Object.keys(EGender) as Array<keyof typeof EGender>).map((key, index) => {
                                const genderValue = EGender[key];
                                return (
                                    <FormCheck
                                        key={index}
                                        type="radio"
                                        label={genderValue}
                                        name="gender"
                                        checked={state.profile?.gender === genderValue}
                                        value={genderValue}
                                        onChange={() => {
                                            dispatch(editProfile({ body: { ...state.profile, gender: genderValue } }));
                                        }}
                                    />
                                );
                            })}
                        </div>

                    </div>
                </div>
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Số điện thoại" />
                        <FormInput value={phone} onChange={(e) => setPhone(e as string)} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Email" />
                        <FormInput value={email} onChange={(e) => setEmail(e as string)} />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label text="Tỉnh/Thành phố" />
                            <FormSelect
                                placeholder="Chọn tỉnh/thành phố"
                                options={provinceOptions}
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label text="Quận/Huyện" />
                            <FormSelect
                                placeholder="Chọn quận/huyện"
                                options={districtOptions}
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                isDisabled={!selectedProvince}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label text="Phường/Xã" />
                            <FormSelect
                                placeholder="Chọn phường/xã"
                                options={communeOptions}
                                value={selectedCommune}
                                onChange={(value) => setSelectedCommune(value as string)}
                                isDisabled={!selectedDistrict}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
