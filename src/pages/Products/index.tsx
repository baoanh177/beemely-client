import { useEffect, useState } from "react";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import ProductList from "./Products/ProductList";
import { IProduct } from "@/services/store/product/product.model";
import { getAllProducts } from "@/services/store/product/product.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import { Container } from "@/styles/common-styles";

function Products() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);

  // ----------- Checkbox Filtering -----------
  const handleChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case "category":
        setSelectedCategories((prevSelectedCategories) =>
          prevSelectedCategories.includes(value)
            ? prevSelectedCategories.filter((category) => category !== value)
            : [...prevSelectedCategories, value],
        );
        break;
      case "gender":
        setSelectedGenders((prevSelectedGenders) =>
          prevSelectedGenders.includes(value) ? prevSelectedGenders.filter((gender) => gender !== value) : [...prevSelectedGenders, value],
        );
        break;
      case "size":
        setSelectedSizes((prevSelectedSizes) =>
          prevSelectedSizes.includes(value) ? prevSelectedSizes.filter((size) => size !== value) : [...prevSelectedSizes, value],
        );
        break;
      case "color":
        setSelectedColors((prevSelectedColors) =>
          prevSelectedColors.includes(value) ? prevSelectedColors.filter((color) => color !== value) : [...prevSelectedColors, value],
        );
        break;
      case "price":
        setSelectedPriceRanges((prevSelectedPriceRanges) =>
          prevSelectedPriceRanges.includes(value)
            ? prevSelectedPriceRanges.filter((price) => price !== value)
            : [...prevSelectedPriceRanges, value],
        );
        break;
      default:
        break;
    }
  };

  // ------------ Button Filtering -----------
  const handleClick = (selectedGenders: string[]) => {
    setSelectedGenders(selectedGenders);
  };

  function filteredData(
    products: IProduct[],
    selectedCategories: string[],
    selectedGenders: string[],
    selectedSizes: string[],
    selectedColors: string[],
    selectedPriceRanges: string[],
  ): IProduct[] {
    let filteredProducts = products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(({ productType }) => selectedCategories.includes(productType.name.toString()));
    }

    if (selectedGenders.length > 0) {
      filteredProducts = filteredProducts.filter(({ gender }) => selectedGenders.includes(gender.name.trim()));
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter(
        ({ productSizes, variants }) =>
          productSizes.some((size) => selectedSizes.includes(size.name.toString())) ||
          variants.some((variant) => selectedSizes.includes(variant.size.name.toString())),
      );
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(
        ({ productColors, variants }) =>
          productColors.some((color) => selectedColors.includes(color.toString())) ||
          variants.some((variant) => selectedColors.includes(variant.color.name.toString())),
      );
    }

    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return (
            product.minPrice !== undefined && product.maxPrice !== undefined && product.minPrice >= min && (max ? product.maxPrice <= max : true)
          );
        }),
      );
    }

    return filteredProducts;
  }

  return (
    <div className="products-page">
      <Container>
        <div className="mb-8 flex">
          <div className="mr-4 w-3/12">
            <Sidebar handleChange={handleChange} products={filteredData(products, [], [], [], [], [])} />
          </div>
          <div className="w-9/12">
            <Recommended handleClick={handleClick} />
            <ProductList
              products={filteredData(products, selectedCategories, selectedGenders, selectedSizes, selectedColors, selectedPriceRanges)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Products;
