import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import ProductList from "./Products/ProductList";
import { IProduct } from "@/services/store/product/product.model";
import { getAllProducts } from "@/services/store/product/product.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import { Container } from "@/styles/common-styles";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);

  // ----------- Radio Filtering -----------
  const handleChange = (event: RadioChangeEvent) => {
    const value = event.target.value;
    if (value === "") {
      setPriceRange(null);
      setSelectedCategory(null);
    } else if (value.includes("-")) {
      const [min, max] = value.split("-").map(Number);
      setPriceRange([min, max]);
    } else {
      setSelectedCategory(value);
    }
  };

  // ------------ Button Filtering -----------
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  function filteredData(products: IProduct[], selected: string | null, priceRange: [number, number] | null): IProduct[] {
    let filteredProducts = products;

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ maxPrice, minPrice, productType, productSizes, productColors, variants, gender }) =>
          maxPrice === Number(selected) ||
          minPrice === Number(selected) ||
          productType.toString() === selected ||
          gender.name.trim() === selected ||
          productSizes.includes(selected as any) ||
          productColors.some((color) => color.toString() === selected) ||
          variants.some((variant) => variant.size.name.toString() === selected) ||
          variants.some((variant) => variant.color.id.toString() === selected),
      );
    }

    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.minPrice !== undefined &&
          product.maxPrice !== undefined &&
          product.minPrice >= priceRange[0] &&
          product.maxPrice <= priceRange[1],
      );
    }

    return filteredProducts;
  }

  return (
    <div className="products-page">
      <Container>
        <div className="mb-8 flex">
          <div className="mr-4 w-3/12">
            <Sidebar handleChange={handleChange} products={filteredData(products, "", null)} />
          </div>
          <div className="w-9/12">
            <Recommended handleClick={handleClick} />
            <ProductList products={filteredData(products, selectedCategory, priceRange)} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Products;
