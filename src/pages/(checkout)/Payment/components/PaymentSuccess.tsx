import { IOrder } from "@/services/store/order/order.model";
import { Container } from "@/styles/common-styles";
import { useConfetti } from "@/hooks/useConfetti";
import { useEffect } from "react";
import OrderInfomation from "./OrderInfomation";
import SuccessNotification from "./SuccessNotification";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";

interface PaymentSuccessProps {
  order: IOrder;
}

const PaymentSuccess = ({ order }: PaymentSuccessProps) => {
  const { onOpen } = useConfetti();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Container className="py-14">
      <div className="mx-auto max-w-xl">
        <SuccessNotification order={order} />
        <OrderInfomation order={order} />
        <div className="mt-6 flex items-center justify-center rounded-full">
          <Link to={`/profile/orders/detail/${order.id}`}>
            <Button text="Xem đơn hàng" />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
