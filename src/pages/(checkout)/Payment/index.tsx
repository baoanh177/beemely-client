import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getOrderDetail } from "@/services/store/order/order.thunk";
import PaymentSuccess from "./components/PaymentSuccess";
import { useLocation } from "react-router-dom";
import FailedNotification from "./components/FailedNotification";
import Loading from "./components/Loading";

const PaymentPage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const success = queryParams.get("success");
  const cancel = queryParams.get("cancel");
  const orderId = queryParams.get("order_id");
  const { state, dispatch } = useArchive<IOrderInitialState>("order");

  const { getOrderDetailLoading } = useAsyncEffect(
    (async) => {
      if (orderId && success) {
        async(
          dispatch(
            getOrderDetail({
              param: orderId,
            }),
          ),
          "getOrderDetailLoading",
        );
      }
    },
    [orderId, success],
  );
  if (getOrderDetailLoading) return <Loading />;

  return <div>{state.activeOrder ? <PaymentSuccess order={state.activeOrder} /> : cancel && <FailedNotification />}</div>;
};

export default PaymentPage;
