import { IInitialAddressModalValues } from "@/components/modal/AddressModal";
import { create } from "zustand";

interface useAddressModalProps {
  initialValues: IInitialAddressModalValues | null;
  isOpen: boolean;
  onOpen: (initialValues: IInitialAddressModalValues | null) => void;
  onClose: () => void;
}

export const useAddressModal = create<useAddressModalProps>((set) => ({
  initialValues: null,
  isOpen: false,
  onClose: () => {
    set({ isOpen: false, initialValues: null });
  },
  onOpen: (values: IInitialAddressModalValues | null) => set({ isOpen: true, initialValues: values ? values : null }),
}));
