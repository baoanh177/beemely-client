import { IAddress } from "@/services/store/auth/auth.model";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoCheckbox } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

interface AddressItemProps {
  item: IAddress;
  setAddress: Dispatch<SetStateAction<IAddress | undefined>>;
  isSelected: boolean;
}

const AddressItem = ({ item, isSelected, setAddress }: AddressItemProps) => {
  const formatedAddress = useMemo(() => {
    return `${item.detailAddress}, ${item.commune}, ${item.district}, ${item.city}`;
  }, [item]);

  return (
    <div className="space-y-3 rounded-md bg-primary-10% bg-opacity-40 px-3 py-4" role="button" onClick={() => setAddress(item)}>
      <div className="flex items-center justify-between">
        <FaRegAddressCard className="h-6 w-6 opacity-75" />
        {isSelected && <IoCheckbox className="h-6 w-6" />}
      </div>
      <p className="font-medium">{formatedAddress}</p>
      <Link to="/profile/address" className="flex justify-end">
        <FiEdit className="h-5 w-5" onClick={() => setAddress(item)} />
      </Link>
    </div>
  );
};

export default AddressItem;
