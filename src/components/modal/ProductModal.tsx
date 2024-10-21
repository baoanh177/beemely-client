import React from "react";
import { Modal } from "antd";
import clsx from "clsx";
import { useProductModal } from "@/hooks/useProductModal";
import ProductWrapper from "../product/ProductWrapper";
import { useGetProductDetailQuery } from "@/services/store/product/product.slice";

const ProductModal: React.FC = () => {
  const { isOpen, onClose, productId } = useProductModal();

  if (!productId) return null;

  const { data, isLoading } = useGetProductDetailQuery({ id: productId });

  return (
    <Modal
      width="auto"
      className={clsx("h-[70vh] max-w-[90vw] px-4 md:max-w-[80vw] lg:w-[80vw]")}
      open={isOpen}
      loading={isLoading || !data}
      onCancel={onClose}
      footer={null}
    >
      {data && <ProductWrapper product={data.metaData} />}
    </Modal>
  );
};

export default ProductModal;
