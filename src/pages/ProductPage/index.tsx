import { useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { Container } from "@/styles/common-styles";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductBySlug } from "@/services/store/product/product.thunk";
import ProductInformation from "@/components/product-information";
import Services from "@/components/service/Services";
import Loading from "./Loading";

const ProductPage = () => {
  const { id } = useParams();

  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { getProductByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getProductBySlug({ param: id })), "getProductByIdLoading");
    },
    [id],
  );
  if (getProductByIdLoading) return <Loading />;
  if (state.activeProduct)
    return (
      <Container className="mt-10 space-y-14">
        <ProductWrapper product={state.activeProduct} />
        <ProductInformation product={state.activeProduct} />
        <Services />
      </Container>
    );
};

export default ProductPage;
