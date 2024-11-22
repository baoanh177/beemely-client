import { IComplaint } from "@/services/store/complaint/complaint.model";
import { create } from "zustand";

interface useComplaintModalProps {
  complaint: IComplaint | null;
  isOpen: boolean;
  onOpen: (complaint: IComplaint) => void;
  onClose: () => void;
}

export const useComplaintModal = create<useComplaintModalProps>((set) => ({
  complaint: null,
  isOpen: false,
  onClose: () => {
    set({ isOpen: false, complaint: null });
  },
  onOpen: (complaint: IComplaint) => set({ isOpen: true, complaint }),
}));
