import React from "react";
import { Tag } from "antd";

interface StockSectionProps {
  stock: number;
}

const StockSection: React.FC<StockSectionProps> = ({ stock }) => {
  const status =
    stock <= 0
      ? { text: "Hết hàng", color: "error" }
      : stock <= 5
        ? { text: `Sắp hết hàng - ${stock} sản phẩm`, color: "warning" }
        : stock <= 10
          ? { text: `Còn ít - ${stock} sản phẩm`, color: "warning" }
          : { text: `Còn hàng - ${stock} sản phẩm`, color: "success" };

  return (
    <div className="flex gap-2">
      <span>Kho: </span>
      <Tag color={status.color}>{status.text}</Tag>
    </div>
  );
};

export default StockSection;
