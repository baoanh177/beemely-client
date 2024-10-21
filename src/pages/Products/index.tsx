import ProductFilter from "@/components/filter/ProductFilter";
import { Container } from "@/styles/common-styles";
import ProductList from "./Products/ProductList";

const Products = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 py-10 md:flex-row">
        <div className="w-full md:w-3/12 lg:w-2/12">
          <ProductFilter />
        </div>
        <div className="w-full md:w-9/12 lg:w-10/12">
          <ProductList />
        </div>
      </div>
    </Container>
  );
};

export default Products;
