import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { SlEarphones } from "react-icons/sl";

const Services = () => {
  const serviceData = [
    {
      icon: BsBoxSeam,
      header: "Miễn Phí Vận Chuyển",
      desc: "Miễn phí vận chuyển cho đơn hàng trên $150",
    },
    {
      icon: AiOutlineDollarCircle,
      header: "Đảm Bảo Hoàn Tiền",
      desc: "Trong vòng 30 ngày để đổi hàng",
    },
    {
      icon: SlEarphones,
      header: "Hỗ Trợ Trực Tuyến",
      desc: "24 giờ mỗi ngày, 7 ngày mỗi tuần",
    },
    {
      icon: MdOutlinePayment,
      header: "Thanh Toán Linh Hoạt",
      desc: "Thanh toán bằng nhiều thẻ tín dụng",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-4 md:gap-8 lg:grid-cols-4">
      {serviceData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white flex flex-col items-center justify-center gap-3 p-4 text-center shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl"
          >
            <Icon className="h-7 w-7 shrink-0" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-base font-semibold md:text-lg">{item.header}</p>
              <p className="text-gray-600 line-clamp-4 text-xs md:text-sm">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
