import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getOrderDetail } from "@/services/store/order/order.thunk";
import StatusBadge from "@/components/common/StatusBadge";
import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";

import imgPayos from "@/assets/images/payos-logo.svg";
import imgVnPay from "@/assets/images/vnpay.png";
import { Image } from "antd";
import { formatPrice } from "@/utils/curency";

const OrderDetail = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  const { id } = useParams();
  const activeOrder = state.acctiveOrder;

  useEffect(() => {
    dispatch(getOrderDetail({ param: id }));
  }, [dispatch, id]);

  if (!activeOrder) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl font-bold">Đơn hàng #{activeOrder.uniqueId}</h1>
          <p className="text-sm text-gray-500"></p>
        </div>
        <StatusBadge color={activeOrder.orderStatus} text={activeOrder.orderStatus} />
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
        <h2 className="mb-4 text-lg font-semibold">Mặt hàng</h2>
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
                  <span className="font-medium">₫{item.price.toLocaleString()}</span>
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
            <span className="text-gray-600">Giá gốc:</span>
            <span>{formatPrice(activeOrder.regularTotalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vẫn chuyển:</span>
            <span>{formatPrice(activeOrder.shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Giảm giá:</span>
            <span>-{formatPrice(activeOrder.regularTotalPrice + activeOrder.shippingFee - activeOrder.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Tổng:</span>
            <span>{formatPrice(activeOrder.totalPrice)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              {activeOrder.paymentType === "payos" ? (
                <Image width={100} height={40} preview={false} src={imgPayos} />
              ) : (
                <Image width={90} height={20} preview={false} src={imgVnPay} />
              )}
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
