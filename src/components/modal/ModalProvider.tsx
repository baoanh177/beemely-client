import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import { useProductModal } from "@/hooks/useProductModal";

const ModalProvider = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const { isOpen } = useProductModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{isOpen && <ProductModal />}</>;
};

export default ModalProvider;
