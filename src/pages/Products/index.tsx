import { useEffect, useState } from "react";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import SortControls from "./components/SortControls";
import ProductList from "./Products/ProductList";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState, updateFilters } from "@/services/store/product/product.slice";
import { Container } from "@/styles/common-styles";
import { getAllProducts } from "@/services/store/product/product.thunk";

function Products() {
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    gender: [] as string[],
    productType: [] as string[],
    color: [] as string[],
    size: [] as string[],
    brand: [] as string[],
    orderBy: "createdAt",
    sort: "desc",
    minPrice: "0",
    maxPrice: "10000000",
    label: "",
    tag: "",
  });

  const cleanQueryParams = (query: { [key: string]: any }) => {
    return Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== undefined && v !== "" && v !== "0" && v !== "10000000"));
  };

  useEffect(() => {
    const query = cleanQueryParams({
      ...state.filter,
      gender: filters.gender.length ? filters.gender.join(",") : undefined,
      productType: filters.productType.length ? filters.productType.join(",") : undefined,
      color: filters.color.length ? filters.color.join(",") : undefined,
      brand: filters.brand.length ? filters.brand.join(",") : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      label: filters.label || undefined,
      tag: filters.tag || undefined,
      orderBy: filters.orderBy,
      sort: filters.sort,
    });

    dispatch(getAllProducts({ query }));
  }, [filters, dispatch, state.filter]);

  const handleFilterChange = (type: string, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    dispatch(updateFilters({ [type]: value }));
  };

  const handleGenderSelect = (selectedGenders: string[]) => {
    handleFilterChange("gender", selectedGenders);
  };

  const handleSortChange = (orderBy: string, sort: string) => {
    handleFilterChange("orderBy", orderBy);
    handleFilterChange("sort", sort);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="products-page">
      <Container>
        <div className="mb-8 flex">
          {showFilters && (
            <div className="mr-4 w-3/12">
              <Sidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          )}
          <div className={`${showFilters ? "w-9/12" : "w-full"}`}>
            <div className="flex items-center justify-between">
              <Recommended onSelectGender={handleGenderSelect} />
              <SortControls
                onSortChange={handleSortChange}
                currentSort={filters.sort}
                currentOrderBy={filters.orderBy}
                showFilters={showFilters}
                onToggleFilters={toggleFilters}
              />
            </div>

            <ProductList products={products} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Products;
