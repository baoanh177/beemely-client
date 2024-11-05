import React from "react";
import { Tag } from "antd";
import { EPaymentStatus } from "@/services/store/order/order.model";

interface PaymentStatusTagProps {
  status: EPaymentStatus;
}

const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ status }) => {
  let color: string;
  let label: string;

  switch (status) {
    case EPaymentStatus.PENDING:
      color = "orange";
      label = "Đang chờ xử lý";
      break;
    case EPaymentStatus.COMPLETED:
      color = "green";
      label = "Hoàn thành";
      break;
    case EPaymentStatus.FAILED:
      color = "red";
      label = "Thất bại";
      break;
    default:
      color = "gray";
      label = "Không xác định";
  }

  return <Tag color={color}>{label}</Tag>;
};

export default PaymentStatusTag;
