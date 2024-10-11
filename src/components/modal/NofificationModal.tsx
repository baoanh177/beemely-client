import { Modal } from "antd";
import { IconType } from "react-icons";

interface NofificationModalProps {
  title: string;
  subTitle?: string;
  icon?: IconType;
  isOpen?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  className?: string;
}

const NofificationModal = ({ isOpen, onClose, afterClose, className, title, subTitle, icon }: NofificationModalProps) => {
  const Icon = icon || null;
  return (
    <Modal className={className} open={isOpen} centered onClose={onClose} onCancel={onClose} afterClose={afterClose} footer={null}>
      <div className="mt-8 flex flex-col items-center space-y-5">
        {Icon && <Icon className="h-10 w-10" />}
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-center text-xl font-semibold">{title}</h3>
          {subTitle && <p>{subTitle}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default NofificationModal;
