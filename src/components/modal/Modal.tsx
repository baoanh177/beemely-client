import React from "react";
import { Modal } from "antd";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const CustomeModal = ({ isOpen, onClose, children, className, isLoading, title }: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title={title} className={className} centered loading={isLoading}>
      {children}
    </Modal>
  );
};

export default CustomeModal;
