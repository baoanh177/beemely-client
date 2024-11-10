import { Modal } from "antd";
import clsx from "clsx";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IVoucherInitialState } from "@/services/store/voucher/voucher.slice";
import { getAllVoucher } from "@/services/store/voucher/voucher.thunk";
import { useVoucherModal } from "@/hooks/useVoucherModal";
import VoucherItem from "../common/VoucherItem";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { IVoucher } from "@/services/store/voucher/voucher.model";

const VoucherModal: React.FC = () => {
  const { isOpen, onClose } = useVoucherModal();

  const { state, dispatch } = useArchive<IVoucherInitialState>("vouchers");
  const { state: cartState } = useArchive<ICartInitialState>("cart");
  const { getAllVoucherLoading } = useAsyncEffect((async) => {
    async(dispatch(getAllVoucher()), "getAllVoucherLoading");
  }, []);

  const { eligibleVouchers, ineligibleVouchers } = state?.vouchers.reduce<{
    eligibleVouchers: IVoucher[];
    ineligibleVouchers: IVoucher[];
  }>(
    (acc, voucher) => {
      const isNotEligible = cartState.subTotal < voucher.minimumOrderPrice;
      return isNotEligible
        ? { ...acc, ineligibleVouchers: [...acc.ineligibleVouchers, voucher] }
        : { ...acc, eligibleVouchers: [...acc.eligibleVouchers, voucher] };
    },
    { eligibleVouchers: [], ineligibleVouchers: [] },
  );

  const sortedVouchers = [...eligibleVouchers, ...ineligibleVouchers];

  return (
    <Modal className={clsx("")} open={isOpen} loading={getAllVoucherLoading} centered onCancel={onClose} footer={null}>
      <ul className="no-scrollbar mt-6 max-h-[50vh] space-y-2 overflow-y-auto p-2">
        {sortedVouchers.map((item) => (
          <VoucherItem key={item.id} voucher={item} />
        ))}
      </ul>
    </Modal>
  );
};

export default VoucherModal;
