import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "@/assets/images/logo.png";
import ButtonLogin from "./ButtonLogin";
import NavLinks from "./NavLinks";
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white-500">
      <div className="flex items-center justify-between font-medium">
        <div className="z-50 flex w-full justify-between p-5 md:w-auto">
          <img src={Logo} alt="logo" className="h-9 md:cursor-pointer" />
          <div className="flex items-center md:hidden">
            <SearchOutlined className="mr-4 text-lg" />
            <HeartOutlined className="mr-4 text-lg" />
            <ShoppingCartOutlined className="mr-4 text-lg" />
            <div className="text-3xl" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
        <ul className="hidden items-center justify-between gap-8 font-[Poppins] uppercase md:flex">
          <NavLinks />
        </ul>

        <div className="hidden items-center md:flex">
          <SearchOutlined className="mr-4 text-lg" />
          <HeartOutlined className="mr-4 text-lg" />
          <ShoppingCartOutlined className="mr-4 text-lg" />
          <div className="hidden md:block">
            <ButtonLogin />
          </div>
        </div>
        {/* Mobile nav */}
        <ul
          className={`fixed bottom-0 top-0 z-40 w-full overflow-y-auto bg-white-500 py-24 pl-4 duration-500 md:hidden ${open ? "left-0" : "left-[-100%]"} `}
        >
          <NavLinks />
          <div className="py-5">
            <ButtonLogin />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
