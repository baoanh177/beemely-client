import { useState, useEffect } from "react";
import ReviewProduct from "./ReviewProducts";
import DescriptionProduct from "./DescriptionProduct";
import InfomationProduct from "./InfomationProduct";
const currentUser = {
  name: "Ahihi",
  email: "thichanthitcho@gmail.com",
  image: "https://picsum.photos/200/300",
};
const fakeProductData = {
  description:
    "Giày Adidas nổi tiếng với thiết kế hiện đại, chất liệu bền bỉ và công nghệ tiên tiến. Thương hiệu này mang đến sự thoải mái và phong cách cho người dùng, từ giày thể thao chuyên nghiệp đến các mẫu giày thời trang thường ngày. Các dòng sản phẩm của Adidas, như UltraBoost, Stan Smith hay NMD, luôn được ưa chuộng bởi tính năng vượt trội và vẻ ngoài thời thượng, phù hợp cho cả hoạt động thể thao lẫn sử dụng hằng ngày.",
  colors: ["Red", "Blue", "Orange", "Black", "Green", "Yellow"],
  sizes: [37, 38, 39, 40],
  reviews: [],
};

const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState("descriptions");
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    setProductData(fakeProductData);
  }, []);

  const tabs = [
    { id: "descriptions", label: "Mô tả" },
    { id: "additional", label: "Thông tin bổ sung" },
    { id: "reviews", label: "Đánh giá" },
  ];

  if (!productData) return <div>Loading...</div>;

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
        {activeTab === "descriptions" && <DescriptionProduct description={productData.description} />}
        {activeTab === "additional" && <InfomationProduct colors={productData.colors} sizes={productData.sizes} />}
        {activeTab === "reviews" && <ReviewProduct reviews={productData.reviews} currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default ProductInformation;
