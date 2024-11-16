import React from "react";
import { Tag } from "antd";
import { EStatusOrder } from "@/shared/enums/order";

interface OrderStatusTagProps {
  status: EStatusOrder;
}

const OrderStatusTag: React.FC<OrderStatusTagProps> = ({ status }) => {
  let color: string;
  let label: string;

  switch (status) {
    case EStatusOrder.PENDING:
      color = "orange";
      label = "Đang chờ xử lý";
      break;
    case EStatusOrder.PROCESSING:
      color = "blue";
      label = "Đang xử lý";
      break;
    case EStatusOrder.DELIVERING:
      color = "purple";
      label = "Đã gửi hàng";
      break;
    case EStatusOrder.DELIVERED:
      color = "green";
      label = "Đã giao hàng";
      break;
    case EStatusOrder.CANCELLED:
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
