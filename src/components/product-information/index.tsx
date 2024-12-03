import { useState } from "react";
import DescriptionProduct from "./DescriptionProduct";
import InfomationProduct from "./InfomationProduct";
import { IProductColor, ISize } from "@/services/store/product/product.model";

import ReviewProduct from "./ReviewProducts";

interface ProductInformationProps {
  product: {
    id: string;
    description: string;
    productColors: IProductColor[];
    productSizes: ISize[];
  };
}

const ProductInformation = ({ product }: ProductInformationProps) => {
  const [activeTab, setActiveTab] = useState("descriptions");

  const tabs = [
    { id: "descriptions", label: "Mô tả" },
    { id: "additional", label: "Thông tin bổ sung" },
    { id: "reviews", label: "Đánh giá" },
  ];

  if (!product) return <div>Loading...</div>;
  const colorNames = product.productColors.map((color: IProductColor) => color.colorId.name);
  const sizeNames = product.productSizes.map((size: ISize) => size.name);

  return (
    <div className="w-full px-4">
      <div className="flex gap-4 border-b border-gray-80%">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 ${activeTab === tab.id ? "border-b-2 border-primary-500" : "text-gray-500"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-4">
        {activeTab === "descriptions" && <DescriptionProduct description={product.description} />}
        {activeTab === "additional" && <InfomationProduct colors={colorNames} sizes={sizeNames} />}
        {activeTab === "reviews" && <ReviewProduct productId={product.id} />}
      </div>
    </div>
  );
};

export default ProductInformation;
