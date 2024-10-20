import { formatPrice } from "@/utils/curency";
import { Tag } from "antd";

interface IPriceSesction {
  discountPrice: number | 0;
  regularPrice: number;
}

const PriceSection = ({ regularPrice, discountPrice }: IPriceSesction) => {
  const discountPercentage = Math.round(((regularPrice - discountPrice) / regularPrice) * 100);

  return (
    <div className="flex items-center space-x-2 font-semibold">
      {discountPrice ? (
        <>
          <span className="text-nowrap text-sm text-primary-500 md:text-base">{formatPrice(discountPrice)}</span>
          <span className="text-nowrap text-sm text-gray-500 line-through md:text-base">{formatPrice(regularPrice)}</span>
          <Tag color="green">{-discountPercentage}% OFF</Tag>
        </>
      ) : (
        <span className="text-primary-500">{formatPrice(regularPrice)}</span>
      )}
    </div>
  );
};

export default PriceSection;
