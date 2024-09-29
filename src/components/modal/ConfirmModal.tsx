import { Modal } from "antd";

interface ConfirmModalProps {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const ConfirmModal = ({ title, isOpen, onClose, className, isLoading, children }: ConfirmModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title={title} footer={null} className={className} centered loading={isLoading} onCancel={onClose}>
      {children}
    </Modal>
  );
};

export default ConfirmModal;
