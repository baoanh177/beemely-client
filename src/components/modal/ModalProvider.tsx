import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import { useProductModal } from "@/hooks/useProductModal";
import VoucherModal from "./VoucherModal";
import { useVoucherModal } from "@/hooks/useVoucherModal";
import { useAddressModal } from "@/hooks/useAddressModal";
import AddressModal from "./AddressModal";

const ModalProvider = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const { isOpen } = useProductModal();
  const { isOpen: isVoucherModalOpen } = useVoucherModal();
  const { isOpen: isAddressModalOpen, initialValues } = useAddressModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isOpen && <ProductModal />} {isVoucherModalOpen && <VoucherModal />}{" "}
      {isAddressModalOpen && <AddressModal initialValues={initialValues} />}
    </>
  );
};

export default ModalProvider;
