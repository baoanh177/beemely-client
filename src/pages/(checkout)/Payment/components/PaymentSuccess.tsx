import { IOrder } from "@/services/store/order/order.model";
import { Container } from "@/styles/common-styles";
import { useConfetti } from "@/hooks/useConfetti";
import { useEffect } from "react";
import OrderInfomation from "./OrderInfomation";
import SuccessNotification from "./SuccessNotification";

interface PaymentSuccessProps {
  order: IOrder;
}

const PaymentSuccess = ({ order }: PaymentSuccessProps) => {
  const { onOpen } = useConfetti();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl">
        <SuccessNotification />
        <OrderInfomation order={order} />
      </div>
    </Container>
  );
};

export default PaymentSuccess;
