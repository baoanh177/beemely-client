import React, { useEffect } from "react";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/services/store/product/product.thunk";
import { IProductInitialState } from "@/services/store/product/product.slice";
import { useArchive } from "@/hooks/useArchive";
import { IProduct } from "@/services/store/product/product.model";

const ProductList: React.FC = () => {
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;
  console.log("products", products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const content = products.map((product: IProduct, index) => {
    return (
      <ProductCard
        key={index}
        productId={product?.id}
        image={product?.thumbnail}
        description={product?.description}
        type="wishlist"
        regularPrice={product?.maxPrice ?? 0}
        discountPrice={product?.minPrice}
        name={product.name}
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
