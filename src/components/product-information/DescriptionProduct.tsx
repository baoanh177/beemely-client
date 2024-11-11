import React from "react";

interface DescriptionProductProps {
  description: string;
}

const DescriptionProduct: React.FC<DescriptionProductProps> = ({ description }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default DescriptionProduct;
