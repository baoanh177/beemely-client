import React from "react";
import { Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

interface PriceProps {
  handleChange: (event: RadioChangeEvent) => void;
  isExpanded: boolean;
}

const Price: React.FC<PriceProps> = ({ handleChange, isExpanded }) => {
  const formatVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const priceRanges = [
    { value: "", label: "Tất cả sản phẩm" },
    { value: "500000-1500000", label: `${formatVND(500000)} - ${formatVND(1500000)}` },
    { value: "1500000-2500000", label: `${formatVND(1500000)} - ${formatVND(2500000)}` },
    { value: "2500000-4000000", label: `${formatVND(2500000)} - ${formatVND(4000000)}` },
  ];

  return (
    <div
      className={`bg-white rounded-lg p-4 pt-0 shadow-sm transition-all duration-300 ${
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <div className="space-y-4">
        <Radio.Group onChange={handleChange} defaultValue="" className="w-full">
          <Space direction="vertical" className="w-full">
            {priceRanges.map((range) => (
              <Radio
                key={range.value}
                value={range.value}
                className="hover:bg-gray-50 text-gray-700 flex w-full items-center rounded-md p-2 transition-colors duration-200"
              >
                <span className="text-sm">{range.label === "All Prices" ? "All Prices" : range.label}</span>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Price;
