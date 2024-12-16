import { useArchive } from "@/hooks/useArchive";
import { EPaymentStatus, IOrder } from "@/services/store/order/order.model";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getAllOrderByUser, reOrder, rePaymentOrder, updateOrder } from "@/services/store/order/order.thunk";
import { EStatusOrder } from "@/shared/enums/order";
import { Dropdown, MenuProps, Modal } from "antd";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { IoBanSharp } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { EComplaintStatus } from "@/services/store/complaint/complaint.model";

interface OrderActionsProps {
  order: IOrder;
}

const { confirm } = Modal;

const OrderActions = ({ order }: OrderActionsProps) => {
  const { dispatch } = useArchive<IOrderInitialState>("order");
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "Xác nhận đã nhận hàng",
      key: "1",
      icon: <IoCheckmarkCircleOutline />,
      onClick: () => handleSuccessOrder(order.id),
      disabled:
        (order.orderStatus !== EStatusOrder.DELIVERED && order.orderStatus !== EStatusOrder.COMPENSATED) ||
        order.complaint?.status === EComplaintStatus.PENDING ||
        [EStatusOrder.SUCCESS, EStatusOrder.CANCELLED, EStatusOrder.REQUEST_RETURN, EStatusOrder.RETURNING, EStatusOrder.RETURNED].includes(
          order.orderStatus,
        ),
    },
    {
      label: "Mua lại",
      key: "2",
      icon: <IoCheckmarkCircleOutline />,
      onClick: () => {
        confirm({
          okButtonProps: { style: { backgroundColor: "#2B292F", borderColor: "#2B292F" } },
          title: "Mua lại sản phẩm",
          content: "Bạn có chắc chắn muốn mua lại đơn hàng này không?",
          onOk: () => handleReOrder(order.id),
          okText: "Xác nhận",
          cancelText: "Hủy",
        });
      },
      disabled: order.orderStatus !== EStatusOrder.SUCCESS,
    },
    {
      label: "Khiếu nại đơn hàng",
      key: "3",
      icon: <IoCheckmarkCircleOutline />,
      onClick: () => {
        confirm({
          okButtonProps: { style: { backgroundColor: "#2B292F", borderColor: "#2B292F" } },
          title: "Khiếu nại đơn hàng",
          content: "Bạn có chắc chắn muốn khiếu nại đơn hàng này không?",
          onOk: () => navigate(`/profile/orders/complaint/${order.id}`),
          okText: "Xác nhận",
          cancelText: "Hủy",
          children: <div>lí do khiếu nại</div>,
        });
      },
      disabled:
        order.orderStatus !== EStatusOrder.DELIVERED ||
        !!order.complaint ||
        [(EStatusOrder.SUCCESS, EStatusOrder.CANCELLED, EStatusOrder.REQUEST_RETURN, EStatusOrder.RETURNING, EStatusOrder.RETURNED)].includes(
          order.orderStatus,
        ),
    },
    {
      label: "Thanh toán lại",
      key: "4",
      icon: <FiCreditCard />,
      onClick: () => {
        confirm({
          okButtonProps: { style: { backgroundColor: "#2B292F", borderColor: "#2B292F" } },
          title: "Thanh toán lại",
          content: "Bạn có chắc chắn muốn thanh toán lại đơn hàng này không?",
          onOk: () => handleRePaymentOrder(order.id),
          okText: "Xác nhận",
          cancelText: "Hủy",
        });
      },
      disabled: ![EPaymentStatus.FAILED, EPaymentStatus.PENDING].includes(order.paymentStatus) || order.paymentType === "cod",
    },
    {
      label: "Hủy đơn hàng",
      key: "5",
      icon: <IoBanSharp />,
      danger: true,
      disabled: order.orderStatus !== EStatusOrder.PENDING,
      onClick: () => {
        confirm({
          okButtonProps: { style: { backgroundColor: "#2B292F", borderColor: "#2B292F" } },
          title: "Hủy đơn hàng",
          content:
            "Bạn có chắc chắn muốn hủy đơn hàng này không?  Nếu bạn đã thanh toán, nhân viên của chúng tôi sẽ tự liên hệ tới bạn để tiến hành thủ tục hoàn tiền. Thời gian hoàn tiền có thể mất tới 1 tới 2 ngày làm việc!",
          onOk: () => handleCancelOrder(order.id),
          okText: "Hủy đơn hàng",
          cancelText: "Không",
        });
      },
    },
  ];

  const handleCancelOrder = async (orderId: string) => {
    try {
      await dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.CANCELLED } })).unwrap();
      toast.success("Đã hủy đơn hàng thành công");
    } catch (error: any) {
      const message = error.errors.message || "Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại!";
      toast.error(message);
      await dispatch(getAllOrderByUser({}));
    }
  };

  const handleSuccessOrder = async (orderId: string) => {
    try {
      await dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.SUCCESS } })).unwrap();
      toast.success("Đã nhận hàng thành công");
    } catch (error: any) {
      const message = error.errors.message || "Có lỗi xảy ra xác nhận hoàn thành đơn hàng. Vui lòng thử lại!";
      toast.error(message);
    }
  };

  const handleRePaymentOrder = async (orderId: string) => {
    try {
      const { metaData } = await dispatch(rePaymentOrder({ param: orderId })).unwrap();

      if (metaData.checkoutUrl) {
        window.location.href = metaData.checkoutUrl;
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  const handleReOrder = async (orderId: string) => {
    try {
      const { metaData } = await dispatch(reOrder({ param: orderId })).unwrap();

      if (metaData.checkoutUrl) {
        window.location.href = metaData.checkoutUrl;
      }
    } catch (err: any) {
      const errMessage = err.errors.message || "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!";
      toast.error(errMessage);
    }
  };

  const menuProps = {
    items,
  };

  return (
    <div>
      <Dropdown menu={menuProps}>
        <div className="text-white hover:bg-primary-30% flex cursor-pointer items-center gap-2 rounded-md bg-primary-10% px-3 py-1 text-sm">
          Hành động
          <IoIosArrowDown />
        </div>
      </Dropdown>
    </div>
  );
};

export default OrderActions;
