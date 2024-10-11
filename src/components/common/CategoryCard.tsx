import { useState } from "react";
import Button from "./Button";

export interface ICategoryCardProps {
  background: string;
  name: string;
}

const CategoryCard = ({ background, name }: ICategoryCardProps) => {
  const [imageSrc, setImageSrc] = useState<string>(background || "src/assets/images/errorbgcategory.jpg");

  const handleImageError = () => {
    setImageSrc("src/assets/images/errorbgcategory.jpg");
  };

  return (
    <div className="relative flex max-h-[500px] w-[calc((100%_-_16px)_/_2)] flex-wrap gap-[16px] md:w-[calc((100%_-_36px)_/_4)] md:gap-[12px]">
      <img src={imageSrc} alt={name} className="h-full max-h-[350px] min-h-[250px] w-full object-cover" onError={handleImageError} />
      <Button className="absolute bottom-6 left-6 right-6" text={name} variant="default" />
    </div>
  );
};

export default CategoryCard;
