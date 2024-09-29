import { create } from "zustand";

interface useConfirmModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfirmModal = create<useConfirmModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
