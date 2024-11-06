import { useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { Container } from "@/styles/common-styles";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductById } from "@/services/store/product/product.thunk";
import Loading from "../Loading/Loading";

const ProductPage = () => {
  const { id } = useParams();

  const { state, dispatch } = useArchive<IProductInitialState>("product");
  const { getProductByIdLoading } = useAsyncEffect(async () => {
    if (id) {
      await dispatch(getProductById({ param: id }));
    }
  }, [id]);
  if (getProductByIdLoading) return <Loading />;
  if (state.activeProduct)
    return (
      <Container>
        <ProductWrapper product={state.activeProduct} />
      </Container>
    );
};

export default ProductPage;
