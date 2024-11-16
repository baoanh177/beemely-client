import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { IProduct } from "@/services/store/product/product.model";

interface ProductProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductProps> = ({ products }) => {
  const content = products.map((product: IProduct, index) => {
    return (
      <ProductCard
        key={index}
        slug={product?.slug}
        image={product?.thumbnail}
        description={product?.sortDescription}
        type="wishlist"
        regularPrice={product?.maxPrice ?? 0}
        discountPrice={product?.minPrice}
        name={product.name}
        productId={product.id}
      />
    );
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">{content}</div>
    </div>
  );
};

export default ProductList;
