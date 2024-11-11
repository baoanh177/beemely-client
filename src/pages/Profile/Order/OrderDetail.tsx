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

const OrderDetail = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  const { id } = useParams();
  const activeOrder = state.acctiveOrder;


  useEffect(() => {
    dispatch(getOrderDetail({ param: id }));
  }, [dispatch, id]);

  if (!activeOrder) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-6 space-y-8">
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{activeOrder.uniqueId}</h1>
          <p className="text-sm text-gray-500"></p>
        </div>
        <StatusBadge color={activeOrder.orderStatus} text={activeOrder.orderStatus} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{activeOrder.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{activeOrder.userEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{activeOrder.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium text-right flex-1 ml-4">{activeOrder.shippingAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Fee:</span>
              <span className="font-medium">₫{activeOrder.shippingFee.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {activeOrder.items.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <img
                src={item.product.thumbnail}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  Size: {item.variant.size.name} | Color: {item.variant.color.name}
                </p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm">Quantity: {item.quantity}</span>
                  <span className="font-medium">₫{item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span>₫{activeOrder.regularTotalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Fee:</span>
            <span>₫{activeOrder.shippingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>₫{activeOrder.totalPrice.toLocaleString()}</span>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium uppercase">{activeOrder.paymentType}</span>
              {activeOrder.paymentType === "payos" ? (
                <Image width={100} height={40} preview={false} src={imgPayos} />
              ) : (
                <Image width={90} height={20} preview={false} src={imgVnPay} />
              )}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Payment Status:</span>
              <PaymentStatusBadge status={activeOrder.paymentStatus} text={activeOrder.paymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
