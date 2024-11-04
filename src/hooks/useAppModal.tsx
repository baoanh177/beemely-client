import { create } from "zustand";

interface useAppModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAppModal = create<useAppModalProps>((set) => ({
  isOpen: false,
  onClose: () => {
    set({ isOpen: false });
  },
  onOpen: () => set({ isOpen: true }),
}));
