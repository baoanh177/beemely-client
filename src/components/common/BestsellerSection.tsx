import { productMock } from "@/services/store/product/mockData";
import ProductCard from "./ProductCard";
import { Container } from "@/styles/common-styles";
import Title from "./Title";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllProducts } from "@/services/store/product/product.thunk";

const BestsellerSection = () => {
  const { state, dispatch } = useArchive<IProductInitialState>("product");
  const { getAllProductsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllProducts({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );
  const content = state.products.map((product, index) => {
    const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);
    return (
      <ProductCard
        key={index}
        productId={product.id}
        image={product.thumbnail}
        description={product.sortDescription}
        type="wishlist"
        regularPrice={sortVariants[0].price}
        discountPrice={sortVariants[0].discountPrice}
        name={product.name}
      />
    );
  });

  return (
    <Container className="space-y-10">
      <Title text="Sản phẩm bán chạy nhất" isCenter className="text-3xl font-normal" />
      <div className="grid grid-cols-2 gap-4 gap-y-6 pb-10 pt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{content}</div>
    </Container>
  );
};

export default BestsellerSection;
