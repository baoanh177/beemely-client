import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import ReviewModal from "@/components/product-information/ReviewModel";
import { useArchive } from "@/hooks/useArchive";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getAllOrderByUser } from "@/services/store/order/order.thunk";
import { IOrderItem } from "@/services/store/product/product.model";
import { IProductInitialState } from "@/services/store/product/product.slice";
import { getReviewByProduct } from "@/services/store/product/product.thunk";
import { IReview } from "@/services/store/review/review.model";
import { IReviewInitialState } from "@/services/store/review/review.slice";
import { createReview, getAllReviews } from "@/services/store/review/review.thunk";
import { EStatusOrder } from "@/shared/enums/order";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<IOrderItem | null>(null);

  useEffect(() => {
    dispatch(getAllOrderByUser({}));
  }, []);

  const handleReviewSubmit = async (values: IReview) => {
    if (!values.content || !values.rates) {
      message.error("Vui lòng điền đầy đủ thông tin đánh giá.");
      return;
    }
    console.log(values);
    const payload = {
      content: values.content,
      rates: values.rates,
      orderItemId: selectedOrderItem?.id || "",
      images: values.images ?? [],
    };
    console.log("Payload sent to API: ", payload);
    try {
      await dispatch(createReview(payload));
      message.success("Đánh giá của bạn đã được gửi thành công!");
      setReviewModalOpen(false);
      // navigate("/reviews");
    } catch (error) {
      console.log("Error: ", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {state.orders.map((item) => (
        <div key={item.id} className="flex flex-col gap-4 border-b border-gray-20% pb-6">
          {item.items.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex w-[400px] flex-col gap-4">
                <div className="flex gap-4">
                  <img className="w-[100px]" src={order.product.thumbnail} alt={order.product.name} />
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
                {item.orderStatus == EStatusOrder.SUCCESS && (
                  <Button
                    isDisabled={order.hasFeedback}
                    text="Viết đánh giá"
                    size="full"
                    onClick={() => {
                      setSelectedOrderItem(order);
                      setReviewModalOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        selectedOrderItem={selectedOrderItem}
      />
    </div>
  );
};

export default Orders;
