import { create } from "zustand";

interface useProductModalProps {
  productId: string | null;
  isOpen: boolean;
  onOpen: (productId: string) => void;
  onClose: () => void;
}

export const useProductModal = create<useProductModalProps>((set) => ({
  productId: null,
  isOpen: false,
  onClose: () => {
    set({ isOpen: false, productId: null });
  },
  onOpen: (productId: string) => set({ isOpen: true, productId }),
}));
