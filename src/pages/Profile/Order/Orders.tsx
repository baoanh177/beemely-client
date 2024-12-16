import Button from "@/components/common/Button";
import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import { DefaultSearch, IDefaultSearchProps } from "@/components/common/search/DefaultSearch";
import StatusBadge from "@/components/common/StatusBadge";
import ReviewModal from "@/components/product-information/ReviewModal";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IOrderInitialState, setFilter } from "@/services/store/order/order.slice";
import { getAllOrderByUser } from "@/services/store/order/order.thunk";
import { IReview } from "@/services/store/review/review.model";
import { createReview, getAllReviews } from "@/services/store/review/review.thunk";
import { EStatusOrder } from "@/shared/enums/order";
import { formatPrice } from "@/utils/curency";
import { Empty, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderActions from "./OrderActions";
import { MdReport } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useComplaintModal } from "@/hooks/useComplaintModal";
import { EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { IOrderItem } from "@/services/store/order/order.model";

const Orders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<IOrderItem | null>(null);

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
    [EStatusOrder.RETURNED]: "Đổi trả thành công",
    [EStatusOrder.DENIED_RETURN]: "Từ chối đổi trả",
    [EStatusOrder.COMPENSATING]: "Đang được đổi sản phẩm mới",
    [EStatusOrder.COMPENSATED]: "Đã được đổi sản phẩm mới",
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

  const handleReviewSubmit = async (values: IReview) => {
    if (!values.content || !values.rates) {
      message.error("Vui lòng điền đầy đủ thông tin đánh giá.");
      return;
    }

    const payload = {
      content: values.content,
      rates: values.rates,
      orderItemId: selectedOrderItem?.id || "",
      images: values.images ?? [],
    };

    try {
      await dispatch(createReview({ body: payload })).unwrap();
      message.success("Đánh giá của bạn đã được gửi thành công!");
      await dispatch(getAllOrderByUser({ query: { ...state.filter } }));
      if (selectedOrderItem) {
        await dispatch(getAllReviews({ param: selectedOrderItem.product.id }));
      }
      setReviewModalOpen(false);
      setSelectedOrderItem(null);
      navigate(`/profile/review-history`);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      message.error(error?.message || "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
    }
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
                <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-primary-5% p-2 shadow-md">
                  <div className="flex flex-wrap justify-between gap-2 rounded-t-lg border-b border-primary-5% px-2 py-3">
                    <Link to={`/profile/orders/detail/${item.id}`} className="text-base font-semibold">
                      Đơn hàng: <span className="hover:underline">#{item.uniqueId}</span>
                    </Link>
                    <div className="flex flex-wrap items-center gap-4">
                      <StatusBadge status={item.orderStatus} color={item.orderStatus} />
                      <PaymentStatusBadge text={item.paymentStatus} status={item.paymentStatus} />
                      <OrderActions order={item} />
                    </div>
                  </div>
                  <div className="pb-4">
                    {item.items.map((order) => (
                      <div key={order.id} className="flex flex-col">
                        <div className="flex items-center justify-between gap-8 px-4 pt-8">
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                              <img className="aspect-square h-16 w-16 rounded-md" src={order.product.thumbnail} alt={order.product.name} />
                              <div className="flex flex-col gap-[2px] text-sm">
                                <Link to={`/product/${order.product.slug}`} className="font-semibold">
                                  {order.product.name}
                                </Link>
                                <p>
                                  Kích cỡ: <span>{order.variant?.size.name}</span>
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
                        </div>
                        {item.orderStatus === EStatusOrder.SUCCESS && (
                          <div className="self-end">
                            <div className="flex flex-col gap-2">
                              <Button
                                className="h-[45px]"
                                text={order.hasFeedback ? "Xem đánh giá" : "Đánh giá"}
                                size="full"
                                variant="ghost"
                                onClick={() => {
                                  if (order.hasFeedback) {
                                    navigate(`/profile/review-history`);
                                  } else {
                                    setSelectedOrderItem(order);
                                    setReviewModalOpen(true);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {item.complaint && (
                    <div className="border-t border-primary-10% px-8 py-4">
                      <Button
                        variant={
                          item.complaint.status === EComplaintStatus.PENDING || item.complaint.status === EComplaintStatus.PROCESSING
                            ? "danger"
                            : item.complaint.status === EComplaintStatus.RESOLVED || item.complaint.status === EComplaintStatus.COMPENSATE
                              ? "success"
                              : "secondary"
                        }
                        icon={
                          item.complaint.status === EComplaintStatus.RESOLVED || item.complaint.status === EComplaintStatus.COMPENSATE ? (
                            <IoIosCheckmarkCircle className="h-5 w-5" />
                          ) : (
                            <MdReport className="h-5 w-5" />
                          )
                        }
                        text={
                          item.complaint.status === EComplaintStatus.RESOLVED || item.complaint.status === EComplaintStatus.COMPENSATE
                            ? "Đã xử lý"
                            : "Xem khiếu nại"
                        }
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
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
          selectedOrderItem={selectedOrderItem}
        />
      </div>
    </>
  );
};

export default Orders;
