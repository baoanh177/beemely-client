import { useMemo, useState } from "react";

import { IProduct, IVariant } from "@/services/store/product/product.model";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetail";

interface ProductWrapperProps {
  product: IProduct;
}

const ProductWrapper = ({ product }: ProductWrapperProps) => {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

  const variantImage = useMemo(
    () => [...product.productColors].find((color) => selectedVariant?.color.id === color.colorId.id)?.imageUrl,
    [product, selectedVariant],
  );

  console.log(variantImage);

  const sortVariants = useMemo(() => [...product.variants].sort((a, b) => a.price - b.price), [product]);

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <ProductGallery thumbnail={variantImage || product.thumbnail} images={product.images} />
      <ProductDetails
        product={product}
        sortVariant={sortVariants[0]}
        selectedVariant={selectedVariant || null}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  );
};

export default ProductWrapper;
