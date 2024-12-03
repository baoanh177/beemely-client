import { Input, Button } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.png";
import { FaArrowRight, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark-500 p-8 text-white-500">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo và Liên hệ */}
          <div className="space-y-4">
            <img src={logo} alt="Logo" className="h-9 md:cursor-pointer" />
            <div className="space-y-2">
              <p className="flex items-center">
                <PhoneOutlined className="mr-2" /> (704) 555-0127
              </p>
              <p className="flex items-center">
                <MailOutlined className="mr-2" /> beemely@gmail.com
              </p>
              <p className="flex items-center">
                <EnvironmentOutlined className="mr-2" /> Mường Thanh Grand Hà Nội Centre Hotel
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Thông tin</h3>
            <ul className="space-y-2">
              <li>Tài khoản của tôi</li>
              <li>Đăng nhập</li>
              <li>Giỏ hàng của tôi</li>
              <li>Danh sách yêu thích của tôi</li>
              <li>Thanh toán</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>Về chúng tôi</li>
              <li>Cơ hội nghề nghiệp</li>
              <li>Thông tin giao hàng</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản & Điều kiện</li>
            </ul>
          </div>

          <div className="max-w-full">
            <h3 className="mb-4 text-lg font-semibold">Đăng ký</h3>
            <p className="mb-4">Nhập email của bạn bên dưới để là người đầu tiên biết về các bộ sưu tập mới và ra mắt sản phẩm.</p>
            <div className="flex items-center rounded-lg border border-gray-500 p-1">
              <MailOutlined className="mx-2 text-gray-500" />
              <Input placeholder="Email của bạn" variant="borderless" className="flex-grow bg-transparent text-white-500 focus:outline-none" />
              <Button
                type="primary"
                className="border-none bg-transparent text-gray-500 hover:bg-transparent hover:text-white-500"
                icon={<FaArrowRight size={12} />}
              />
            </div>
          </div>
        </div>

        <div className="border-gray-700 mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="text-center">
            <p>©2024 Beemely tất cả các quyền được bảo lưu</p>
          </div>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <FaFacebookSquare className="text-2xl" />
            <InstagramOutlined className="text-2xl" />
            <TwitterOutlined className="text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
