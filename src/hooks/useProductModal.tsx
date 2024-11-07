import { create } from "zustand";

interface useProductModalProps {
  slug: string | null;
  isOpen: boolean;
  onOpen: (slug: string) => void;
  onClose: () => void;
}

export const useProductModal = create<useProductModalProps>((set) => ({
  slug: null,
  isOpen: false,
  onClose: () => {
    set({ isOpen: false, slug: null });
  },
  onOpen: (slug: string) => set({ isOpen: true, slug }),
}));
