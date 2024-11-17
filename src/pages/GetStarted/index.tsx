import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Mua sắm dễ dàng",
      description: "Hàng nghìn sản phẩm chất lượng cao với giá cả cạnh tranh",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Giao hàng nhanh chóng",
      description: "Miễn phí giao hàng cho đơn hàng trên 500k",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "An toàn & Bảo mật",
      description: "Bảo vệ thông tin và thanh toán của bạn",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Thanh toán linh hoạt",
      description: "Hỗ trợ nhiều phương thức thanh toán",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF2FF]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`transform text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="mb-6 bg-gradient-to-r from-tertiary-300 to-primary-300 bg-clip-text text-5xl font-bold text-transparent">
            Khám phá thế giới mua sắm trực tuyến
          </h1>
          <p className="mb-8 text-xl text-primary-400">Trải nghiệm mua sắm tuyệt vời với hàng nghìn sản phẩm chất lượng</p>
          <Link to="/">
            <button className="group relative inline-flex transform items-center rounded-full bg-gradient-to-r from-tertiary-300 to-primary-300 px-8 py-3 text-lg font-medium text-white-500 transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-tertiary-300 focus:ring-offset-2">
              Bắt đầu ngay
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform rounded-xl bg-white-500 p-8 shadow-lg transition-all duration-1000 hover:scale-105 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-tertiary-5 mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-tertiary-300">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-primary-500">{feature.title}</h3>
              <p className="text-primary-100">{feature.description}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-32 transform rounded-2xl bg-white-500 p-12 shadow-xl transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary-500">Đăng ký nhận thông tin ưu đãi</h2>
            <p className="mb-8 text-primary-100">Nhận ngay voucher 100k cho đơn hàng đầu tiên khi đăng ký</p>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="border-gray-20 bg-white-5 flex-1 rounded-full border px-6 py-3 text-primary-500 placeholder-primary-100 focus:outline-none focus:ring-2 focus:ring-tertiary-300"
              />
              <button className="transform rounded-full bg-gradient-to-r from-tertiary-300 to-primary-300 px-8 py-3 text-white-500 transition-all duration-300 hover:scale-105 hover:opacity-90">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
