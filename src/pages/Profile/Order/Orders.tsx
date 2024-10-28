import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { useArchive } from "@/hooks/useArchive";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getAllOrderByUser } from "@/services/store/order/order.thunk";
import { useEffect } from "react";

const Orders = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>('order');

  useEffect(() => {
    dispatch(getAllOrderByUser({}));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {state.items.map((item) => (
        <div key={item.id} className="border-b border-gray-20% pb-6 flex flex-col gap-4">
          {item.items.map((order) => (
            <div key={order.id} className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <img className="w-[100px]" src={order.product.thumbnail} alt={order.product.name} />
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">{order.product.name}</div>
                    <div>Size: <span>{order.variant.size.name}</span></div>
                    <div>Qty: <span>{order.quantity}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge color="orange" text={item.orderStatus} />
                  <div>Your product has been delivered</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-bold">${order.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button text="View Order" size="full" variant="ghost" />
                <Button text="Write A Review" size="full" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default Orders;