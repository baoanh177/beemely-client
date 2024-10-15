import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { SlEarphones } from "react-icons/sl";
const Services = () => {
  const serviceData = [
    {
      icon: <BsBoxSeam />,
      header: "Miễn Phí Vận Chuyển",
      desc: "Miễn phí vận chuyển cho đơn hàng trên $150",
    },
    {
      icon: <AiOutlineDollarCircle />,
      header: "Đảm Bảo Hoàn Tiền",
      desc: "Trong vòng 30 ngày để đổi hàng",
    },
    {
      icon: <SlEarphones />,
      header: "Hỗ Trợ Trực Tuyến",
      desc: "24 giờ mỗi ngày, 7 ngày mỗi tuần",
    },
    {
      icon: <MdOutlinePayment />,
      header: "Thanh Toán Linh Hoạt",
      desc: "Thanh toán bằng nhiều thẻ tín dụng",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-8">
      {serviceData.map((item, index) => (
        <div key={index} className="flex h-[150px] flex-col gap-5">
          <div className="px-1 text-[35px]">{item.icon}</div>
          <div className="flex flex-col justify-end gap-1">
            <div className="text-xl font-semibold">{item.header}</div>
            <div className="line-clamp-4 text-sm">{item.desc}</div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default Services;
