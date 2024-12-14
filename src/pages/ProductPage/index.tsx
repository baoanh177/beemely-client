import { Link, useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { Container } from "@/styles/common-styles";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductBySlug } from "@/services/store/product/product.thunk";
import ProductInformation from "@/components/product-information";
import Services from "@/components/service/Services";
import Loading from "./Loading";
import Button from "@/components/common/Button";

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
      <Container className="my-10 space-y-14">
        <ProductWrapper product={state.activeProduct} />
        <ProductInformation product={state.activeProduct} />
        <Services />
      </Container>
    );

  return (
    <Container className="my-10">
      <div className="flex flex-col items-center py-28">
        <h1 className="text-gray-800 mb-4 text-5xl font-extrabold">Không thấy sản phẩm</h1>
        <p className="text-gray-600 mb-8 text-xl">Sản phẩm bạn tìm kiếm hiện không còn khả dụng</p>
        <Link to="/" className="text-white rounded-md">
          <Button text="Về trang chủ" />
        </Link>
      </div>
      <Services />
    </Container>
  );
};

export default ProductPage;
