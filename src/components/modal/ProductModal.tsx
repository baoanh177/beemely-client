import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import clsx from "clsx";
import { productMock } from "@/services/store/product/mockData";
import { useProductModal } from "@/hooks/useProductModal";
import { IProduct } from "@/services/store/product/product.model";
import ProductWrapper from "../product/ProductWrapper";

const ProductModal: React.FC = () => {
  const { isOpen, onClose, productId } = useProductModal();
  const [product, setProduct] = useState<IProduct | undefined>();

  useEffect(() => {
    if (productId) {
      const findProduct = productMock.find((p) => p.id === productId);
      setProduct(findProduct);
    }
  }, [productId]);

  if (!product) {
    return null;
  }

  return (
    <Modal
      width="auto"
      className={clsx("h-[70vh] max-w-[90vw] px-4 md:max-w-[80vw] lg:w-[80vw]")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <ProductWrapper product={product} />
    </Modal>
  );
};

export default ProductModal;
