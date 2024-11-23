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
import { Empty } from "antd";
import { formatPrice } from "@/utils/curency";
import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import OrderActions from "./OrderActions";
import { MdReport } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { useComplaintModal } from "@/hooks/useComplaintModal";
import { EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";

const Orders = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");

  const { onOpen } = useComplaintModal();

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
    [EStatusOrder.REQUEST_RETURN]: "Yêu cầu đổi trả",
    [EStatusOrder.RETURNING]: "Đang được đổi trả",
    [EStatusOrder.RETURNED]: "Đổi trả và hoàn tiền thành công",
    [EStatusOrder.DENIED_RETURN]: "Người bán từ chối khiếu nại",
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

  const handleFeedbackOrder = async (orderId: string) => {
    dispatch(updateOrder({ param: orderId, body: { order_status: EStatusOrder.SUCCESS } }));
    toast.success("Đã nhận hàng thành công");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <DefaultSearch {...defaultSearch} />
        {getAllOrderLoading ? (
          <Skeleton />
        ) : (
          <>
            {state.orders.length ? (
              state.orders.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-primary-5% shadow-md">
                  <div className="flex justify-between rounded-t-lg border-b border-primary-5% px-8 py-3">
                    <Link to={`/profile/orders/detail/${item.id}`} className="text-base font-semibold">
                      Đơn hàng: <span className="hover:underline">#{item.uniqueId}</span>
                    </Link>
                    <div className="flex flex-nowrap items-center gap-4">
                      <StatusBadge text={item.orderStatus} color={item.orderStatus} />
                      <PaymentStatusBadge text={item.paymentStatus} status={item.paymentStatus} />
                      <OrderActions order={item} />
                    </div>
                  </div>
                  <div className="px-8 py-4">
                    {item.items.map((order) => (
                      <div key={order.id} className="mt-2 flex items-center justify-between">
                        <div className="flex w-[400px] flex-col gap-4">
                          <div className="flex gap-4">
                            <img className="aspect-square h-16 w-16 rounded-md" src={order.product.thumbnail} alt={order.product.name} />
                            <div className="flex flex-col gap-[2px] text-sm">
                              <div className="font-semibold">{order.product.name}</div>
                              <p>
                                Kích cỡ: <span>{order.variant.size.name}</span>
                              </p>
                              <p>
                                Số lượng: <span>{order.quantity}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-base font-semibold">{formatPrice(order.price)}</div>
                        </div>
                        {item.orderStatus === EStatusOrder.SUCCESS && order.hasFeedback && (
                          <Button className="h-[45px]" text="Đánh giá" variant="ghost" onClick={() => handleFeedbackOrder(item.id)} />
                        )}
                      </div>
                    ))}
                  </div>
                  {item.complaint && (
                    <div className="border-t border-primary-10% px-8 py-4">
                      <Button
                        variant={
                          item.complaint.status === EComplaintStatus.PENDING
                            ? "danger"
                            : item.complaint.status === EComplaintStatus.RESOLVED
                              ? "success"
                              : "secondary"
                        }
                        icon={
                          item.complaint.status === EComplaintStatus.RESOLVED ? (
                            <IoIosCheckmarkCircle className="h-5 w-5" />
                          ) : (
                            <MdReport className="h-5 w-5" />
                          )
                        }
                        text={item.complaint.status === EComplaintStatus.RESOLVED ? "Đã xử lý" : "Xem khiếu nại"}
                        className="flex items-center space-x-2"
                        onClick={() => {
                          onOpen({ ...item.complaint, order: item.uniqueId } as IComplaint);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Empty description={<span className="font-semibold">Không tìm thấy đơn hàng nào</span>} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
