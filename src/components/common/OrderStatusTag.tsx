import React from "react";
import { Tag } from "antd";
import { EOrderStatus } from "@/services/store/order/order.model";

interface OrderStatusTagProps {
  status: EOrderStatus;
}

const OrderStatusTag: React.FC<OrderStatusTagProps> = ({ status }) => {
  let color: string;
  let label: string;

  switch (status) {
    case EOrderStatus.PENDING:
      color = "orange";
      label = "Đang chờ xử lý";
      break;
    case EOrderStatus.PROCESSING:
      color = "blue";
      label = "Đang xử lý";
      break;
    case EOrderStatus.SHIPPED:
      color = "purple";
      label = "Đã gửi hàng";
      break;
    case EOrderStatus.DELIVERED:
      color = "green";
      label = "Đã giao hàng";
      break;
    case EOrderStatus.CANCELLED:
      color = "red";
      label = "Đã hủy";
      break;
    default:
      color = "gray";
      label = "Không xác định";
  }

  return <Tag color={color}>{label}</Tag>;
};

export default OrderStatusTag;
