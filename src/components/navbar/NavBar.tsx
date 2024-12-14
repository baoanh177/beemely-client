import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";
import logo from "@/assets/images/logo.png";
import CartPopover from "../cart/CartPopover";
import ButtonLogin from "./ButtonLogin";
import UserDropdown from "./UserDropdown";
import clsx from "clsx";
import { Container } from "@/styles/common-styles";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { state } = useArchive<IAuthInitialState>("auth");

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <nav
      className={clsx(
        "fixed left-0 right-0 top-0 z-50 flex items-center bg-white-500 transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <Container className="flex h-full w-full justify-between font-medium">
        <div className="z-50 flex w-full justify-between p-5 lg:w-auto">
          <div className="flex cursor-pointer items-center gap-3 px-5" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="h-[34px] w-[34px]" />
            <div className="display-m-semibold">Beemely</div>
          </div>
          <div className="flex items-center space-x-4 lg:hidden">
            <Search />
            <FaRegHeart className="text-lg" />
            <CartPopover />
            <button className="text-3xl" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <ul className="hidden items-center justify-between gap-8 text-sm uppercase lg:flex">
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/products">Cửa hàng</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/contact">Liên hệ</NavItem>
        </ul>

        <div className="hidden items-center space-x-4 lg:flex">
          <Search />
          <Link to="/profile/wishlists">
            <FaRegHeart className="cursor-pointer text-lg" />
          </Link>
          <CartPopover />
          {state.isLogin ? <UserDropdown isMobile={false} /> : <ButtonLogin />}
        </div>

        <MobileMenu open={open} setOpen={setOpen} isLoggedIn={state.isLogin} />
      </Container>
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
      className={`absolute inset-y-0 left-0 flex h-screen w-full max-w-sm flex-col bg-white-500 transition-transform duration-300 ${
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
