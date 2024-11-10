import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import { useProductModal } from "@/hooks/useProductModal";
import VoucherModal from "./VoucherModal";
import { useVoucherModal } from "@/hooks/useVoucherModal";

const ModalProvider = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const { isOpen } = useProductModal();
  const { isOpen: isVoucherModalOpen } = useVoucherModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isOpen && <ProductModal />} {isVoucherModalOpen && <VoucherModal />}
    </>
  );
};

export default ModalProvider;
