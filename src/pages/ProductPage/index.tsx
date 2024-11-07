import { useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { Container } from "@/styles/common-styles";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductBySlug } from "@/services/store/product/product.thunk";
import Loading from "../Loading/Loading";

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
      <Container>
        <ProductWrapper product={state.activeProduct} />
      </Container>
    );
};

export default ProductPage;
