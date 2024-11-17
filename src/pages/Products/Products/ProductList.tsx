import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { IProduct } from "@/services/store/product/product.model";

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  console.log("2343333", products);
  const content = products.map((product) => {
    const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);
    return (
      <ProductCard
        key={product.id}
        slug={product.slug}
        image={product.thumbnail}
        description={product.sortDescription}
        type="wishlist"
        regularPrice={sortVariants[0].price}
        discountPrice={sortVariants[0].discountPrice}
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
