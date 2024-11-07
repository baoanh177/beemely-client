import React from "react";
import { Modal } from "antd";
import clsx from "clsx";
import { useProductModal } from "@/hooks/useProductModal";
import ProductWrapper from "../product/ProductWrapper";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductBySlug } from "@/services/store/product/product.thunk";

const ProductModal: React.FC = () => {
  const { isOpen, onClose, slug } = useProductModal();

  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { getProductByIdLoading } = useAsyncEffect(
    (async) => {
      slug && async(dispatch(getProductBySlug({ param: slug })), "getProductByIdLoading");
    },
    [slug],
  );
  return (
    <Modal
      width="auto"
      className={clsx("h-[70vh] max-w-[90vw] px-4 md:max-w-[80vw] lg:w-[80vw]")}
      open={isOpen}
      loading={getProductByIdLoading || !state.activeProduct}
      onCancel={onClose}
      footer={null}
    >
      {state.activeProduct && <ProductWrapper product={state.activeProduct} />}
    </Modal>
  );
};

export default ProductModal;
