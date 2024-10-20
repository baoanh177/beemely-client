import React from "react";

interface InfomationProductProps {
  colors: string[];
  sizes: string[];
}

const InfomationProduct: React.FC<InfomationProductProps> = ({ colors, sizes }) => {
  return (
    <div className="">
      <div className="mb-4 flex">
        <div className="w-1/4 font-bold">Màu sắc</div>
        <div className="w-3/4">{colors.join(", ")}</div>
      </div>
      <div className="flex">
        <div className="w-1/4 font-bold">Kích cỡ</div>
        <div className="w-3/4">{sizes.join(", ")}</div>
      </div>
    </div>
  );
};

export default InfomationProduct;
