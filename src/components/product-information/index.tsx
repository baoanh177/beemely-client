import { useState } from "react";
import DescriptionProduct from "./DescriptionProduct";
import InfomationProduct from "./InfomationProduct";
import { IProductColor, ISize } from "@/services/store/product/product.model";

interface ProductInformationProps {
  product: {
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
  const colorNames = product.productColors.map((color: IProductColor) => color.id);
  const sizeNames = product.productSizes.map((size: ISize) => size.name);

  return (
    <div className="w-full px-4">
      <div className="flex gap-4 border-b border-gray-80%">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`cursor-pointer border-b-2 py-2 font-medium transition-all duration-200 ease-out ${
              activeTab === tab.id ? "text-black border-black" : "hover:text-black border-transparent text-gray-500 hover:border-gray-5%"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full">
        {activeTab === "descriptions" && <DescriptionProduct description={product.description} />}
        {activeTab === "additional" && <InfomationProduct colors={colorNames} sizes={sizeNames} />}
        {/* {activeTab === "reviews" && <ReviewProduct reviews={product.reviews} currentUser={currentUser} />} */}
      </div>
    </div>
  );
};

export default ProductInformation;
