import React from "react";

interface InfomationProductProps {
  colors: string[];
  sizes: string[];
}

const InfomationProduct: React.FC<InfomationProductProps> = ({ colors, sizes }) => {
  return (
    <div className="w-full">
      <div className="mb-4 flex">
        <div className="w-1/4">
          <span className="mr-2 font-bold">Màu sắc:</span> <span>{colors.join(", ")}</span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4">
          <span className="mr-4 font-bold">Kích cỡ:</span>
          <span>{sizes.join(", ")} </span>
        </div>
      </div>
    </div>
  );
};

export default InfomationProduct;
