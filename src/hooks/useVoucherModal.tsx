import { create } from "zustand";

interface useVoucherModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useVoucherModal = create<useVoucherModalProps>((set) => ({
  isOpen: false,
  onClose: () => {
    set({ isOpen: false });
  },
  onOpen: () => set({ isOpen: true }),
}));
