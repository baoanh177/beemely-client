import { COMPLAINT_REASONS_CONVERT, EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { Carousel, Image, Modal } from "antd";
import ComplaintStatusBadge from "../common/ComplaintStatusBadge";
import Button from "../common/Button";
import { IComplaintInitialState } from "@/services/store/complaint/complaint.slice";
import { useArchive } from "@/hooks/useArchive";
import { withdrawComplaint } from "@/services/store/complaint/complaint.thunk";

interface ComplaintModalProps {
  complaint: IComplaint | null;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const { confirm } = Modal;

const ComplaintModal = ({ isOpen, onClose, className, complaint }: ComplaintModalProps) => {
  const { dispatch } = useArchive<IComplaintInitialState>("complaints");

  const handleClick = (id: string) => {
    dispatch(
      withdrawComplaint({
        param: id,
      }),
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <Modal className={className} open={isOpen} centered onClose={onClose} onCancel={onClose} footer={null}>
      {complaint && (
        <div className="mt-4 flex flex-col space-y-4 text-sm">
          <h2 className="text-2xl font-bold">Chi tiết khiếu nại</h2>
          <Carousel arrows infinite={false} className="aspect-square">
            {complaint.images.map((image, index) => (
              <Image
                className="rounded-md"
                key={index}
                src={image}
                alt={`Complaint image ${index + 1}`}
                width={"100%"}
                height={"100%"}
                preview
              />
            ))}
          </Carousel>
          <p>
            Mã đơn hàng:<span className="font-semibold"> #{complaint.order}</span>
          </p>
          <p>
            Lí do khiếu nại:<span className="font-semibold"> {COMPLAINT_REASONS_CONVERT[complaint.reason]}</span>
          </p>
          <p>
            Mô tả:<span className="font-semibold"> {complaint.description}</span>
          </p>
          <p className="flex items-center gap-2">
            Trạng thái khiếu nại:
            <ComplaintStatusBadge status={complaint.status} />
          </p>
          {(complaint.status === EComplaintStatus.PENDING || complaint.status === EComplaintStatus.CANCELLED) && (
            <Button
              text="Thu hồi khiếu nại đơn hàng"
              onClick={() =>
                confirm({
                  title: "Hủy khiếu nại đồng nghĩa bạn đã xác nhận hoàn thành đơn hàng này. Tiếp tục?",
                  centered: true,
                  okButtonProps: { style: { backgroundColor: "#2B292F", borderColor: "#2B292F" } },
                  onOk: () => {
                    handleClick(complaint.id!);
                    if (onClose) onClose();
                  },
                  okText: "Xác nhận",
                  cancelText: "Hủy",
                })
              }
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ComplaintModal;
