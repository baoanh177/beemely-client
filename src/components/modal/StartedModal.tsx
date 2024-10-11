import { Modal } from "antd";
import { ReactNode } from "react";

interface StartedModalProps {
  title: string;
  subTitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  className?: string;
  children?: ReactNode;
}

const StartedModal = ({ isOpen, onClose, afterClose, className, title, subTitle, children }: StartedModalProps) => {
  return (
    <Modal className={className} open={isOpen} centered onClose={onClose} onCancel={onClose} afterClose={afterClose} footer={null}>
      <div className="flex flex-col items-center space-y-2">
        <h3 className="text-center text-xl font-semibold">{title}</h3>
        {subTitle && <p>{subTitle}</p>}
      </div>
      <div>{children}</div>
    </Modal>
  );
};

export default StartedModal;
