import Button from "@/components/common/Button";
import { LuPlus } from "react-icons/lu";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import AddressItem from "./components/AddressItem";
import { useAddressModal } from "@/hooks/useAddressModal";
import { useEffect, useState } from "react";
import { IAddress } from "@/services/store/auth/auth.model";

const Address = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const [userAddresses, setUserAddress] = useState<IAddress[]>(state.profile?.addresses || []);
  const { onOpen } = useAddressModal();

  useEffect(() => {
    setUserAddress(state?.profile?.addresses || []);
  }, [[dispatch, state.profile?.addresses]]);

  return (
    <div>
      <Button className="mb-6 w-[300px] px-14" icon={<LuPlus />} text="Thêm địa chỉ" onClick={() => onOpen(null)} />
      <div className="flex flex-col gap-4">
        {userAddresses.map((address, index) => (
          <AddressItem item={address} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Address;
