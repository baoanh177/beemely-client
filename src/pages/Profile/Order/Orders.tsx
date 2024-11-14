import Button from "@/components/common/Button";
import { IDefaultSearchProps, DefaultSearch } from "@/components/common/search/DefaultSearch";
import StatusBadge from "@/components/common/StatusBadge";
import { useArchive } from "@/hooks/useArchive";
import { IOrderInitialState, setFilter } from "@/services/store/order/order.slice"; // updateOrderStatus để cập nhật trạng thái
import { getAllOrderByUser, updateOrder } from "@/services/store/order/order.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { EStatusOrder } from "@/shared/enums/order";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Card, Empty, Modal } from "antd";
import { formatPrice } from "@/utils/curency";

const { confirm } = Modal;
const Orders = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");

  const { getAllOrderLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllOrderByUser({ query: { ...state.filter } })), "getAllOrderLoading"),
    [JSON.stringify(state.filter)],
  );

  const Skeleton: React.FC = () => (
    <div className="flex flex-col gap-4">
      <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
      <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
      <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
    </div>
  );

  const EStatusOrderLabels: { [key in EStatusOrder]: string } = {
    [EStatusOrder.PENDING]: "Đang chờ xác nhận",
    [EStatusOrder.PROCESSING]: "Đang chuẩn bị hàng",
    [EStatusOrder.DELIVERING]: "Đang giao hàng",
    [EStatusOrder.DELIVERED]: "Giao thành công",
    [EStatusOrder.SUCCESS]: "Đã hoàn thành",
    [EStatusOrder.CANCELLED]: "Đã hủy",
    [EStatusOrder.REQUEST_RETURN]: "Yêu cầu hoàn trả",
    [EStatusOrder.RETURNING]: "Đang hoàn trả",
    [EStatusOrder.RETURNED]: "Đã hoàn trả",
  };

  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: Object.values(EStatusOrder).map((status) => ({
        label: EStatusOrderLabels[status],
        value: status,
      })),
      onChange: (selectedOption: any) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ order_status: statusValue }));
      },
    },
  };

  const handleCancelOrder = (orderId: string) => {
    dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.CANCELLED } }));
    toast.success("Hủy đơn hàng thành công");
  };
  const handleSuccessOrder = (orderId: string) => {
    dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.SUCCESS } }));
    toast.success("Đã nhận hàng thành công");
  };
  const handleFeedbackOrder = (orderId: string) => {
    dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.SUCCESS } }));
    toast.success("Đã nhận hàng thành công");
  };
  const handleRequestReturnOrder = (orderId: string) => {
    dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.REQUEST_RETURN } }));
    toast.success("Đã gửi yêu cầu trả hàng");
  };

  return (
    <div className="flex flex-col gap-6">
      <DefaultSearch {...defaultSearch} />
      {getAllOrderLoading ? (
        <Skeleton />
      ) : (
        <>
          {state.orders.length ? (
            state.orders.map((item) => (
              <Card key={item.id} className="flex flex-col gap-4 border-b border-gray-80% pb-6">
                {item.items.map((order) => (
                  <div key={order.id} className="mt-2 flex items-center justify-between">
                    <div className="flex w-[400px] flex-col gap-4">
                      <div className="flex gap-4">
                        <img className="aspect-square h-20 w-20" src={order.product.thumbnail} alt={order.product.name} />
                        <div className="flex flex-col gap-2">
                          <div className="font-semibold">{order.product.name}</div>
                          <div>
                            Size: <span>{order.variant.size.name}</span>
                          </div>
                          <div>
                            Qty: <span>{order.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold">{formatPrice(order.price)}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-2 flex w-full justify-between gap-2">
                  <div>
                    <StatusBadge text={item.orderStatus} color={item.orderStatus} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/profile/orders/detail/${item.id}`}>
                      <Button size="full" className="h-[45px]" text="Chi tiết đơn hàng" />
                    </Link>
                    {item.orderStatus === EStatusOrder.SUCCESS && (
                      <Button size="full" className="h-[45px]" text="Đánh giá" variant="ghost" onClick={() => handleFeedbackOrder(item.id)} />
                    )}
                    {item.orderStatus === EStatusOrder.PENDING && (
                      <Button
                        size="full"
                        className="h-[45px]"
                        text="Hủy đơn hàng"
                        variant="danger"
                        onClick={() => {
                          confirm({
                            title: "Hủy đơn hàng",
                            content: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
                            onOk: () => handleCancelOrder(item.id),
                            okText: "Hủy đơn hàng",
                            cancelText: "Không",
                          });
                        }}
                      />
                    )}
                    {item.orderStatus === EStatusOrder.DELIVERED && (
                      <Button
                        size="full"
                        className="h-[45px]"
                        text="Đã nhận hàng"
                        variant="danger"
                        onClick={() => handleSuccessOrder(item.id)}
                      />
                    )}
                    {item.orderStatus === EStatusOrder.DELIVERED && (
                      <Button
                        size="full"
                        className="h-[45px]"
                        text="Yêu cầu hoàn trả"
                        variant="danger"
                        onClick={() => handleRequestReturnOrder(item.id)}
                      />
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Empty description={<span className="font-semibold">Không tìm thấy đơn hàng nào</span>} />
          )}
        </>
      )}
    </div>
  );
};

export default Orders;