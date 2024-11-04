import { useEffect, useState } from "react";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import ProductList from "./Products/ProductList";
import { IProduct } from "@/services/store/product/product.model";
import { getProducts } from "@/services/store/product/product.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ----------- Input Filter -----------
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product: IProduct) => product.name.toLowerCase().includes(query.toLowerCase()));

  // ----------- Radio Filtering -----------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  function filteredData(products: IProduct[], selected: string | null, query: string): IProduct[] {
    let filteredProducts = products;

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ maxPrice, minPrice, productType, productSizes, productColors }) =>
          maxPrice === Number(selected) ||
          minPrice === Number(selected) ||
          productType.toString() === selected ||
          productSizes.includes(selected as any) ||
          productColors.includes(selected as any),
      );
    }

    if (query) {
      filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    return filteredProducts;
  }

  return (
    <div className="products-page">
      <Recommended handleClick={handleClick} />
      <Sidebar handleChange={handleChange} products={filteredData(products, "", "")} />
      <ProductList products={filteredData(products, selectedCategory, query)} />
    </div>
  );
}

export default Products;
