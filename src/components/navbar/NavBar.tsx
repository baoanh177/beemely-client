import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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
            <button className="text-3xl" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
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
          <FaRegHeart className="text-lg" />
          <CartPopover />
          {isLoggedIn ? (
            <UserDropdown isMobile={false} />
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
  <div className={`fixed inset-0 z-40 lg:hidden ${open ? "visible" : "invisible"}`}>
    <div
      className={`bg-black/50 absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      onClick={() => setOpen(false)}
    />

    <div
      className={`absolute bottom-0 left-0 top-0 flex w-full max-w-sm flex-col bg-white-500 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col overflow-y-auto py-24 pl-4">
        <ul className="space-y-6">
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

        <div className="mt-6 pr-4">
          {isLoggedIn ? (
            <UserDropdown isMobile={true} />
          ) : (
            <Link to="/auth/login" onClick={() => setOpen(false)}>
              <ButtonLogin className="w-full" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

const MobileNavItem = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <li>
    <Link to={to} onClick={onClick} className="block text-lg">
      {children}
    </Link>
  </li>
);

export default Navbar;
