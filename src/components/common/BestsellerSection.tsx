import ProductCard from "./ProductCard";
import { Container } from "@/styles/common-styles";
import Title from "./Title";
import { useGetProductsQuery } from "@/services/store/product/product.slice";

const BestsellerSection = () => {
  const { data, isLoading } = useGetProductsQuery({ _limit: 8 });

  if (!data) return null;
  if (isLoading) return <>Loading....</>;

  const { metaData } = data;

  const content = metaData.map((product, index) => {
    const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);
    return (
      <ProductCard
        key={index}
        productId={product.id}
        image={product.thumbnail}
        description={product.description}
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
      <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{content}</div>
    </Container>
  );
};

export default BestsellerSection;
