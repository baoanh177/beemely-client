import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductWrapper from "@/components/product/ProductWrapper";
import { productMock } from "@/services/store/product/mockData";
import { IProduct } from "@/services/store/product/product.model";
import { Container } from "@/styles/common-styles";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | undefined>();

  useEffect(() => {
    if (id) {
      const findProduct = productMock.find((p) => p.id === id);
      setProduct(findProduct);
    }
  }, [id]);

  if (!product) {
    return null;
  }
  return (
    <Container>
      <ProductWrapper product={product} />
    </Container>
  );
};

export default ProductPage;
