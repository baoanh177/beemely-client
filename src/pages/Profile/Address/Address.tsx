import Button from "@/components/common/Button";
import FormSelect from "@/components/common/Input/FormSelect";
import FormCheck from "@/components/form/FormCheck";
import { Modal } from "antd";
import { useEffect, useState, useCallback } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { MdOutlineSaveAlt } from "react-icons/md";
import { ICommune, IDistrict, IProvince, provinces } from "../Personal/provinces";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import FormInput from "@/components/form/FormInput";
import { editProfile } from "@/services/store/auth/auth.thunk";
import toast from "react-hot-toast";

const Address = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { state, dispatch } = useArchive<IAuthInitialState>('auth');
    const [addresses, setAddresses] = useState(state.profile?.addresses || []);
    const [currentAddressIndex, setCurrentAddressIndex] = useState<number | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [newAddress, setNewAddress] = useState({
        city: "",
        district: "",
        commune: "",
        detailAddress: "",
        default: false,
    });

    useEffect(() => {
        setAddresses(state.profile?.addresses || []);
    }, [state.profile]);

    const handleDeleteAddress = (index: any) => {
        const updatedAddresses = addresses
            .filter((_, i) => i !== index)
            .map((address) => {
                const { city, district, commune } = getAddressName(address.city, address.district, address.commune);
                return {
                    commune,
                    district,
                    city,
                    detail_address: address.detailAddress,
                    default: address.default,
                };
            });

        const updatedProfile = {
            addresses: updatedAddresses,
        };

        dispatch(editProfile({ body: updatedProfile }))
            .then(() => {
                toast.success("Xóa thành công!", {

                });
            })
            .catch(() => {
                toast.error("Xóa thất bại!", {
                });
            });
    };

    useEffect(() => {
        if (currentAddressIndex !== null) {
            const address = addresses[currentAddressIndex];
            setSelectedCity(address.city);
            setSelectedDistrict(address.district);
            setNewAddress({ ...address, detailAddress: address.detailAddress });
        } else {
            resetNewAddress();
        }
    }, [currentAddressIndex, addresses]);

    const resetNewAddress = useCallback(() => {
        setNewAddress({ city: "", district: "", commune: "", detailAddress: "", default: false });
        setSelectedCity(null);
        setSelectedDistrict(null);
    }, []);

    const getAddressName = (cityInput: string, districtInput: string, communeInput: string) => {
        const province = provinces.find((p: IProvince) => p.idProvince === cityInput);
        const district = province?.districts.find((d: IDistrict) => d.idDistrict === districtInput);
        const commune = district?.communes.find((c: ICommune) => c.idCommune === communeInput);

        return {
            city: province?.name || cityInput,
            district: district?.name || districtInput,
            commune: commune?.name || communeInput,
        };
    };

    const handleEditProfile = useCallback(() => {
        const updatedAddresses = currentAddressIndex !== null
            ? addresses.map((address, index) => (index === currentAddressIndex ? { ...address, ...newAddress } : address))
            : [...addresses, newAddress];

        const updatedProfile = {
            addresses: updatedAddresses.map((address) => {
                const { city, district, commune } = getAddressName(address.city, address.district, address.commune);
                return {
                    commune,
                    district,
                    city,
                    detail_address: address.detailAddress,
                    default: address.default,
                };
            }),
            gender: state.profile?.gender,
        };

        dispatch(editProfile({ body: updatedProfile }));
        handleCancel();
    }, [addresses, currentAddressIndex, newAddress, state.profile?.gender]);

    const handleAddAddress = () => {
        resetNewAddress();
        setIsModalVisible(true);
    };

    const handleEditAddress = (index: number) => {
        setCurrentAddressIndex(index);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentAddressIndex(null);
    };
    const handleDefaultChange = (index: number) => {
        const updatedAddresses = addresses.map((addr, i) => ({
            ...addr,
            default: i === index, 
        }));
        
        setAddresses(updatedAddresses); 
        const updatedProfile = {
            addresses: updatedAddresses.map((address) => {
                const { city, district, commune } = getAddressName(address.city, address.district, address.commune);
                return {
                    commune,
                    district,
                    city,
                    detail_address: address.detailAddress,
                    default: address.default,
                };
            }),
            gender: state.profile?.gender,
        };

        dispatch(editProfile({ body: updatedProfile }))
            .then(() => {
                toast.success("Cập nhật địa chỉ mặc định thành công!");
            })
            .catch(() => {
                toast.error("Cập nhật địa chỉ mặc định thất bại!");
            });
    };
    return (
        <div>
            <Button className="px-14" icon={<LuPlus />} text="Add New Address" onClick={handleAddAddress} />
            <div className="flex flex-col gap-4">
                {addresses.map((address, index) => (
                    <div key={index} className="flex justify-between pt-4 border-b border-gray-200 pb-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-bold">{address.default ? "Địa chỉ mặc định" : "Địa chỉ"}</div>
                            <div>{`${address.city}, ${address.district}`}</div>
                            <div className="flex items-center gap-2"><FiPhoneCall size={20} /> <span>(270 55-0117)</span></div>
                            <FormCheck
                                label="Địa chỉ mặc định"
                                checked={address.default}
                                onChange={() => handleDefaultChange(index)}
                                type="checkbox"
                            />                        </div>
                        <div className="w-[100px] flex gap-4 flex-col">
                            <Button icon={<MdOutlineSaveAlt />} variant="secondary" size="full" text="Edit" onClick={() => handleEditAddress(index)} />
                            <Button
                                icon={<BsTrash3 />}
                                variant="danger"
                                size="full"
                                text="Delete"
                                onClick={() => handleDeleteAddress(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Modal title={currentAddressIndex !== null ? "Edit Address" : "Add New Address"} visible={isModalVisible} onOk={handleEditProfile} onCancel={handleCancel}>
                <div className="flex flex-col gap-4 pt-6">
                    <div className="flex gap-6">
                        <FormSelect
                            placeholder="Chọn tỉnh/thành phố"
                            options={provinces.map((p) => ({ value: p.idProvince, label: p.name }))}
                            value={newAddress.city}
                            onChange={(value) => {
                                const cityValue = value as string;
                                setSelectedCity(cityValue);
                                setNewAddress((prev) => ({ ...prev, city: cityValue, district: "", commune: "" }));
                                setSelectedDistrict(null);
                            }}
                        />
                        <FormSelect
                            placeholder="Chọn quận/huyện"
                            options={selectedCity ? provinces.find(p => p.idProvince === selectedCity)?.districts.map(d => ({ value: d.idDistrict, label: d.name })) || [] : []}
                            value={newAddress.district}
                            onChange={(value) => {
                                const districtValue = value as string;
                                setSelectedDistrict(districtValue);
                                setNewAddress((prev) => ({ ...prev, district: districtValue, commune: "" }));
                            }}
                        />
                        <FormSelect
                            placeholder="Chọn phường/xã"
                            options={selectedDistrict ? provinces.find(p => p.idProvince === selectedCity)?.districts.find(d => d.idDistrict === selectedDistrict)?.communes.map(c => ({ value: c.idCommune, label: c.name })) || [] : []}
                            value={newAddress.commune}
                            onChange={(value) => setNewAddress((prev) => ({ ...prev, commune: value as string }))}
                        />
                    </div>
                    <FormInput
                        label="Địa chỉ chi tiết"
                        value={newAddress.detailAddress}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, detailAddress: e as string }))}
                    />
                  
                </div>
            </Modal>
        </div>
    );
}

export default Address;
