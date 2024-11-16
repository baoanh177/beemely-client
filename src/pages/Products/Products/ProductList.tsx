import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { IProduct } from "@/services/store/product/product.model";

interface ProductListProps {
  products: IProduct[];
  filters: {
    gender: string;
    size: string;
    color: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const content = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        slug={product.slug}
        image={product.thumbnail}
        description={product.sortDescription}
        type="wishlist"
        regularPrice={product.minPrice || 0}
        discountPrice={product.maxPrice || 0}
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
