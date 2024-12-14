import ProductCard from "./ProductCard";
import { Container } from "@/styles/common-styles";
import Title from "./Title";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getBestsellerProducts } from "@/services/store/product/product.thunk";
import { IBestsellerInitialState } from "@/services/store/product/bestseller.slice";

const BestsellerSection = () => {
  const { state, dispatch } = useArchive<IBestsellerInitialState>("bestsellerProducts");

  useAsyncEffect((async) => async(dispatch(getBestsellerProducts({ query: { orderBy: "sold", _limit: 8 } })), "getAllProductsLoading"), []);

  const content = state.products.map((product, index) => {
    const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);

    return (
      <ProductCard
        label={product.labels[0]}
        sold={product.sold || 0}
        averageRating={product.averageRating || 0}
        totalReviews={product.totalReviews || 0}
        productId={product.id}
        key={index}
        slug={product.slug}
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
    <Container className="space-y-4">
      <Title text="Sản phẩm bán chạy nhất" isCenter className="text-xl md:text-3xl" />
      <div className="grid grid-cols-2 gap-4 gap-y-6 pb-10 pt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{content}</div>
    </Container>
  );
};

export default BestsellerSection;
