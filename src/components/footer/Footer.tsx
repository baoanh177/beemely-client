import { Input, Button } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.png";
import BankIcon from "react-br-bank-icons";
import { FaArrowRight, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark-500 p-8 text-white-500">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <img src={logo} alt="Logo" className="h-9 md:cursor-pointer" />
            <div className="space-y-2">
              <p className="flex items-center">
                <PhoneOutlined className="mr-2" /> (704) 555-0127
              </p>
              <p className="flex items-center">
                <MailOutlined className="mr-2" /> krist@example.com
              </p>
              <p className="flex items-center">
                <EnvironmentOutlined className="mr-2" /> 3891 Ranchview Dr. Richardson, California 62639
              </p>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Information</h3>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>Login</li>
              <li>My Cart</li>
              <li>My Wishlist</li>
              <li>Checkout</li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Service</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="max-w-full">
            <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
            <p className="mb-4">Enter your email below to be the first to know about new collections and product launches.</p>
            <div className="flex items-center rounded-lg border border-gray-500 p-1">
              <MailOutlined className="mx-2 text-gray-500" />
              <Input placeholder="Your Email" bordered={false} className="flex-grow bg-transparent text-white-500 focus:outline-none" />
              <Button
                type="primary"
                className="border-none bg-transparent text-gray-500 hover:bg-transparent hover:text-white-500"
                icon={<FaArrowRight size={12} />}
              />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-gray-700 mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <div className="flex space-x-3">
              <BankIcon name="agibank" size={28} />
              <BankIcon bankName="btg" size={28} />
              <BankIcon bankName="original" size={28} />
              <BankIcon bankName="bs2" size={28} />
              <BankIcon bankName="bradesco" size={28} />
            </div>
          </div>
          <div className="text-center">
            <p>©2023 Krist All Rights are reserved</p>
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
