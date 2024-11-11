import { useState } from "react";

import { IProduct, IVariant } from "@/services/store/product/product.model";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetail";
import ProductInformation from "../product-information";

interface ProductWrapperProps {
  product: IProduct;
}

const ProductWrapper = ({ product }: ProductWrapperProps) => {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

  const variantImage = [...product.productColors].find((color) => selectedVariant?.color.id === color.colorId.id)?.imageUrl;

  const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <ProductGallery thumbnail={variantImage || product.thumbnail} images={product.images} />
        <ProductDetails product={product} selectedVariant={selectedVariant || sortVariants[0]} setSelectedVariant={setSelectedVariant} />
      </div>
      <div className="col-span-2 my-8 w-full">
        <ProductInformation product={product} />
      </div>
    </>
  );
};

export default ProductWrapper;
