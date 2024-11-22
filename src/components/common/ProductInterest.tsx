import ProductCard from "./ProductCard";
import { Container } from "@/styles/common-styles";
import Title from "./Title";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllProducts } from "@/services/store/product/product.thunk";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { IUserProfile } from "@/services/store/auth/auth.model";

const ProductInterest = () => {
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { state: userState } = useArchive<IAuthInitialState>("auth");
  const { profile } = userState;

  if (profile && (profile as IUserProfile).tags) {
    const tagsString = profile.tags.join(",");
    useAsyncEffect((async) => async(dispatch(getAllProducts({ query: { tag: tagsString, _limit: 8 } })), "getAllProductsLoading"), []);
  }

  const content = state.products.map((product, index) => {
    const sortVariants = [...product.variants].sort((a, b) => a.price - b.price);

    return (
      <ProductCard
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
      <Title text="Sản phẩm bạn có thể thích" isCenter className="text-xl md:text-3xl" />
      <div className="grid grid-cols-2 gap-4 gap-y-6 pb-10 pt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{content}</div>
    </Container>
  );
};

export default ProductInterest;
