import { useEffect, useState } from "react";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import ProductList from "./Products/ProductList";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import { Container } from "@/styles/common-styles";
import { getAllProducts } from "@/services/store/product/product.thunk";

function Products() {
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { products } = state;
  const [filters, setFilters] = useState({
    gender: "",
    color: [] as string[],
    size: [] as string[],
  });

  useEffect(() => {
    dispatch(
      getAllProducts({
        query: {
          ...filters,
        },
      }),
    );
  }, [filters, dispatch, state.filter]);

  const handleFilterChange = (type: string, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="products-page">
      <Container>
        <div className="mb-8 flex">
          <div className="mr-4 w-3/12">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="w-9/12">
            <Recommended onSelectGender={(gender) => handleFilterChange("gender", gender)} />
            <ProductList products={products} filters={filters} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Products;
