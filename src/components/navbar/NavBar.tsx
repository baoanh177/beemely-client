import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import Logo from "@/assets/images/logo.png";
import CartPopover from "../cart/CartPopover";
import ButtonLogin from "./ButtonLogin";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <nav className="w-full bg-white-500">
      <div className="flex items-center justify-between font-medium">
        <div className="z-50 flex w-full justify-between p-5 lg:w-auto">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-9 cursor-pointer" />
          </Link>
          <div className="flex items-center space-x-4 lg:hidden">
            <RiSearchLine className="text-lg" />
            <FaRegHeart className="text-lg" />
            <CartPopover />
            {isLoggedIn ? (
              <UserDropdown isMobile />
            ) : (
              <Link to="/auth/login">
                <ButtonLogin />
              </Link>
            )}
            <div className="text-3xl" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
        <ul className="hidden items-center justify-between gap-8 font-[Poppins] uppercase lg:flex">
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/products">Cửa hàng</NavItem>
          <NavItem to="/about">Câu chuyện của chúng tôi</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/contact">Liên hệ</NavItem>
        </ul>

        <div className="hidden items-center space-x-4 lg:flex">
          <RiSearchLine className="text-lg" />
          <Link to="/profile/wishlists">
            <FaRegHeart className="text-lg cursor-pointer" />
          </Link>
          <CartPopover />
          {isLoggedIn ? (
            <UserDropdown isMobile />
          ) : (
            <Link to="/auth/login">
              <ButtonLogin />
            </Link>
          )}
        </div>

        <MobileMenu open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  );
};

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to}>{children}</Link>
  </li>
);

const MobileMenu = ({
  open,
  setOpen,
  isLoggedIn,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => (
  <ul
    className={`fixed bottom-0 top-0 z-40 w-full overflow-y-auto bg-white-500 py-24 pl-4 duration-500 lg:hidden ${open ? "left-0" : "left-[-100%]"
      }`}
  >
    <MobileNavItem to="/" onClick={() => setOpen(false)}>
      Trang chủ
    </MobileNavItem>
    <MobileNavItem to="/products" onClick={() => setOpen(false)}>
      Cửa hàng
    </MobileNavItem>
    <MobileNavItem to="/about" onClick={() => setOpen(false)}>
      Câu chuyện của chúng tôi
    </MobileNavItem>
    <MobileNavItem to="/blog" onClick={() => setOpen(false)}>
      Blog
    </MobileNavItem>
    <MobileNavItem to="/contact" onClick={() => setOpen(false)}>
      Liên hệ
    </MobileNavItem>
  </ul>
);

const MobileNavItem = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <li className="mb-6">
    <Link to={to} onClick={onClick}>
      {children}
    </Link>
  </li>
);

export default Navbar;
