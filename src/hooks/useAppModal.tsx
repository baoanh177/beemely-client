import { create } from "zustand";

interface useAppModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAppModal = create<useAppModalProps>((set, get) => ({
  isOpen: false,
  onClose: () => {
    set({ isOpen: false });
    console.log(get().isOpen);
  },
  onOpen: () => set({ isOpen: true }),
}));
