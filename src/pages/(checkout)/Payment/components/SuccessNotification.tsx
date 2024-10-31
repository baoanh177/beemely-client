import { FaCircleCheck } from "react-icons/fa6";
const SuccessNotification = () => {
  return (
    <div className="relative flex flex-col items-center space-y-3">
      <FaCircleCheck size={50} />
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 text-center">
          <h3 className="text-xl font-bold md:text-3xl">Thanh toán thành công</h3>
        </div>
        <div className="mt-2 text-center text-xs font-medium md:mt-3 md:text-sm">
          <p>Đơn hàng của bạn đang được chờ xử lý và sẽ được gửi đi trong vòng 2 ngày làm việc.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;
