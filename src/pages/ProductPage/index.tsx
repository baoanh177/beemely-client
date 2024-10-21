import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { Container } from "@/styles/common-styles";
import ProductInformation from "@/components/product-information";
import BestsellerSection from "@/components/common/BestsellerSection";
import { useGetProductDetailQuery } from "@/services/store/product/product.slice";

const ProductPage = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [id]);

  if (!id) return null;

  const { data: product, isLoading } = useGetProductDetailQuery({ id });

  if (!product) {
    return null;
  }

  if (isLoading) return <>loading....</>;

  return (
    <>
      <Container className="space-y-20 py-20">
        <ProductWrapper product={product.metaData} />
        <ProductInformation />
      </Container>
      <BestsellerSection />
    </>
  );
};

export default ProductPage;
