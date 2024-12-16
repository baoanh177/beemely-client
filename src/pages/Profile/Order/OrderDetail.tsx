import { useParams } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getOrderDetail } from "@/services/store/order/order.thunk";
import StatusBadge from "@/components/common/StatusBadge";
import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import { formatPrice } from "@/utils/curency";
import { format } from "date-fns";
import { PAYMENT_METHODS } from "@/services/store/checkout/checkout.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const OrderDetail = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  const { id } = useParams();
  const activeOrder = state.activeOrder;

  const { getOrderDetailLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getOrderDetail({ param: id })), "getOrderDetailLoading");
    },
    [id],
  );
  if (getOrderDetailLoading || !activeOrder)
    return (
      <div className="flex items-center justify-center p-20">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    );

  const paymentType = PAYMENT_METHODS.find((item) => item.value === state?.activeOrder?.paymentType);

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="text-xl font-bold text-primary-600">Đơn hàng #{activeOrder.uniqueId}</h1>
          <p className="text-base">Ngày đặt hàng: {format(new Date(activeOrder.createdAt), " hh:mm a, dd/MM/yyyy")}</p>
        </div>
        <StatusBadge color={activeOrder.orderStatus} status={activeOrder.orderStatus} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Customer Information */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Thông tin người nhận</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tên:</span>
              <span className="font-medium">{activeOrder.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{activeOrder.userEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{activeOrder.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="ml-4 flex-1 text-right font-medium">{activeOrder.shippingAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Sản phẩm</h2>
        <div className="space-y-4">
          {activeOrder.items.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <img src={item.product.thumbnail} alt={item.product.name} className="h-20 w-20 rounded object-cover" />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-gray-600 text-sm">
                  Size: {item.variant.size.name} | Color: {item.variant.color.name}
                </p>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm">Số lượng: {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Chi tiết thanh toán</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng giá sản phẩm:</span>
            <span>{formatPrice(activeOrder.regularTotalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vẫn chuyển:</span>
            <span>{formatPrice(activeOrder.shippingFee)}</span>
          </div>
          {activeOrder.voucher && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Áp dụng mã giảm giá:</span>
                <p className="flex items-end space-x-2 group-hover:underline">
                  {activeOrder.voucher.name}
                  {activeOrder.voucher.discountTypes === "percentage" && activeOrder.voucher.maxReduce && (
                    <span className="ml-1 text-sm">(Tối đa {formatPrice(activeOrder.voucher.maxReduce)})</span>
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giảm giá:</span>
                <span>-{formatPrice(activeOrder.regularTotalPrice + activeOrder.shippingFee - activeOrder.totalPrice)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-lg font-semibold">
            <span>Tổng:</span>
            <span>{formatPrice(activeOrder.totalPrice)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <div className="flex items-center gap-2">
                <img src={paymentType?.image} width={100} />
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-gray-600">Trạng thái:</span>
              <PaymentStatusBadge status={activeOrder.paymentStatus} text={activeOrder.paymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
