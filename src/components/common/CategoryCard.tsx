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
    <div className="relative aspect-5/6">
      <img src={imageSrc} alt={name} className="h-full w-full object-cover" onError={handleImageError} />
      <Button className="absolute bottom-6 left-6 right-6" text={name} variant="default" />
    </div>
  );
};

export default CategoryCard;
