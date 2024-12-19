import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import StatusBadge from "@/components/common/StatusBadge";
import { PAYMENT_METHODS } from "@/services/store/checkout/checkout.slice";
import { IOrder } from "@/services/store/order/order.model";
import { formatPrice } from "@/utils/curency";
import { Image } from "antd";
import { format } from "date-fns";
import tw from "twin.macro";

const WrapperSpaceBetween = tw.div`flex justify-between text-sm text-primary-400`;

interface OrderInfomationProps {
  order: IOrder;
}

const OrderInfomation = ({ order }: OrderInfomationProps) => {
  const paymentType = PAYMENT_METHODS.find((item) => item.value === order.paymentType);

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Thông tin đơn hàng</h2>
        {order.items.map((item) => (
          <div key={item.id} className="relative flex items-center gap-4 border-b border-primary-10% py-3">
            <img src={item.product.thumbnail} className="h-14 w-14 rounded-md object-cover" alt={item.product.name} />
            <div className="space-y-1">
              <h4 className="font-semibold">{item.product.name}</h4>
              <p className="font-normal text-primary-100">
                {item.variant.color.name} - Cỡ {item.variant.size.name}
              </p>
            </div>
            <div className="text-white absolute -left-2 top-2 rounded-full bg-primary-600 px-2 text-xs font-semibold text-white-5%">
              x{item.quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 font-semibold">
        <h2 className="text-lg">Thông tin thanh toán</h2>
        <WrapperSpaceBetween>
          <p>Phương thức thanh toán</p>
          <div className="flex items-center gap-2">
            <Image src={paymentType?.image} width={30} height={30} />
            <p>{paymentType?.label}</p>
          </div>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Tổng tiền sản phẩm</p>
          <p>{formatPrice(order.regularTotalPrice)}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Vận chuyển</p>
          <p>{formatPrice(order.shippingFee)}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Giảm giá</p>
          <p>-{formatPrice(order.discountPrice || 0)}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Tổng tiền đơn hàng</p>
          <p>{formatPrice(order.totalPrice)}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Số tiền thanh toán</p>
          <p>{formatPrice(order.totalPrice)}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Trạng thái thanh toán</p>
          <PaymentStatusBadge text={order.paymentStatus} status={order.paymentStatus} />
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Trạng thái đơn hàng</p>
          <StatusBadge status={order.orderStatus} color={order.orderStatus} />
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Ngày đặt hàng</p>
          {format(new Date(order.createdAt), " hh:mm a, dd/MM/yyyy")}
        </WrapperSpaceBetween>
      </div>
      <div className="space-y-4 font-semibold">
        <h2 className="text-lg">Thông tin vận chuyển</h2>
        <WrapperSpaceBetween>
          <p>Họ tên người nhận</p>
          <p>{order.userName}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Số điện thoại người nhận</p>
          <p>{order.phoneNumber}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Email người nhận</p>
          <p>{order.userEmail}</p>
        </WrapperSpaceBetween>
        <WrapperSpaceBetween>
          <p>Địa chỉ nhận hàng</p>
          <p>{order.shippingAddress}</p>
        </WrapperSpaceBetween>
      </div>
    </div>
  );
};

export default OrderInfomation;
