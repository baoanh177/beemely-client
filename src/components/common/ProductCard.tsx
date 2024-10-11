import React, { useState } from "react";
import Button from "./Button";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";

export interface IProductCardProps {
  image: string;
  name: string;
  description: string;
  regularPrice: number;
  discountPrice?: number;
  type: "wishlist" | "remove";
}

const ProductCard = ({ image, name, description, regularPrice, discountPrice, type = "wishlist" }: IProductCardProps) => {
  const [imageSrc, setImageSrc] = useState<string>(image || "src/assets/images/errorbgcategory.jpg");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleImageError = () => {
    setImageSrc("src/assets/images/errorbgcategory.jpg");
  };

  return (
    <div
      className="relative flex max-h-[500px] w-[calc((100%_-_16px)_/_2)] flex-wrap gap-[16px] rounded-md border-none transition-all duration-300 md:w-[calc((100%_-_36px)_/_4)] md:gap-[12px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <img src={imageSrc} alt={name} className="h-full w-full rounded-t-md object-cover" onError={handleImageError} />
        <div
          className={`absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="self-end">
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
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            )}
          </div>
          <Button className="w-full transition-transform duration-300 ease-in-out hover:scale-105" text="Add to Cart" variant="default" />
        </div>
      </div>
      <div>
        <h3 className="font-bold">{name}</h3>
        <p>{description}</p>
        <div className="flex items-center space-x-2">
          {discountPrice ? (
            <>
              <span className="text-primary-500">${discountPrice}</span>
              <span className="text-gray-500 line-through">${regularPrice}</span>
            </>
          ) : (
            <span className="text-primary-500">${regularPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
