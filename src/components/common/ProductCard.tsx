import { useState } from "react";
import Button from "./Button";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { useProductModal } from "@/hooks/useProductModal";
import { formatPrice } from "@/utils/curency";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";

export interface IProductCardProps {
  productId?: string;
  slug: string;
  image: string;
  name: string;
  description: string;
  regularPrice: number;
  discountPrice?: number;
  type: "wishlist" | "remove";
  onRemove?: (productId: string) => void;
}
const ProductCard = ({
  image,
  name,
  slug,
  description,
  regularPrice,
  discountPrice,
  type = "wishlist",
  onRemove,
}: IProductCardProps & { onRemove?: (id: string) => void }) => {
  const [imageSrc, setImageSrc] = useState<string>(image || "src/assets/images/errorbgcategory.jpg");
  const { onOpen } = useProductModal();

  const handleImageError = () => {
    setImageSrc("src/assets/images/errorbgcategory.jpg");
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(slug);
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="group relative overflow-hidden">
        <Link to={`/product/${slug}`}>
          <img src={imageSrc} alt={name} className="aspect-5/6 rounded-t-md object-cover" onError={handleImageError} />
        </Link>
        <div className="absolute -right-20 top-5 transition-all duration-300 ease-in-out group-hover:right-5">
          {type === "wishlist" ? (
            <Button
              shape="rounded"
              icon={<CiHeart size={24} />}
              type="button"
              variant="default"
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          ) : (
            <Button
              shape="rounded"
              icon={<HiOutlineTrash size={24} />}
              type="button"
              variant="danger"
              onClick={handleRemove}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          )}
        </div>
        <div className="absolute -bottom-20 left-1/2 flex w-full -translate-x-1/2 justify-center transition-all group-hover:bottom-3">
          <Button
            icon={<BsCartCheck className="mr-2 h-5 w-5" />}
            onClick={() => onOpen(slug)}
            className="w-3/4 text-nowrap font-medium"
            text="Thêm vào giỏ hàng"
            variant="default"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Link to={`/product/${slug}`} className="line-clamp-1 font-bold">
          {name}
        </Link>
        <p className="line-clamp-1 text-sm capitalize">{description}</p>
        <div className="flex items-center space-x-2 font-semibold">
          {discountPrice ? (
            <>
              <span className="text-nowrap text-sm text-primary-500 md:text-base">{formatPrice(discountPrice)}</span>
              <span className="text-nowrap text-sm text-gray-500 line-through md:text-base">{formatPrice(regularPrice)}</span>
            </>
          ) : (
            <span className="text-primary-500">{formatPrice(regularPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
