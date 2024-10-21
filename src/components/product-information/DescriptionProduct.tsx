import React from "react";

interface DescriptionProductProps {
  description: string;
}

const DescriptionProduct: React.FC<DescriptionProductProps> = ({ description }) => {
  return (
    <div>
      <p className="text-m-semibold">{description}</p>
    </div>
  );
};

export default DescriptionProduct;
