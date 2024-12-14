import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { IProduct } from "@/services/store/product/product.model";

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);
          return (
            <div key={product.id}>
              <ProductCard
                label={product.labels[0]}
                sold={product.sold || 0}
                averageRating={product.averageRating || 0}
                totalReviews={product.totalReviews || 0}
                slug={product.slug}
                image={product.thumbnail}
                description={product.sortDescription}
                type="wishlist"
                regularPrice={sortVariants[0].price}
                discountPrice={sortVariants[0].discountPrice}
                name={product.name}
                productId={product.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
