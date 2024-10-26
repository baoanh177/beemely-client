import clsx from "clsx";
import { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

import Logo from "@/assets/images/logo.png";
import ButtonLogin from "./ButtonLogin";
import NavLinks from "./NavLinks";
import CartPopover from "../cart/CartPopover";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white-500">
      <div className="flex items-center justify-between font-medium">
        <div className="z-50 flex w-full justify-between p-5 lg:w-auto">
          <img src={Logo} alt="logo" className="h-9 cursor-pointer" />
          <div className="flex items-center space-x-4 lg:hidden">
            <RiSearchLine className="text-lg" />
            <FaRegHeart className="text-lg" />
            <CartPopover />
            <div className="text-3xl" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
        <ul className="hidden items-center justify-between gap-8 uppercase lg:flex">
          <NavLinks />
        </ul>

        <div className="hidden items-center space-x-4 lg:flex">
          <RiSearchLine className="text-lg" />
          <FaRegHeart className="text-lg" />
          <CartPopover />
          <div className="hidden lg:block">
            <ButtonLogin />
          </div>
        </div>
        {/* Mobile and Tablet nav */}
        <ul
          className={clsx(
            "fixed bottom-0 top-0 z-40 w-full overflow-y-auto bg-white-500 py-24 pl-4 duration-500 lg:hidden",
            open ? "left-0" : "left-[-100%]",
          )}
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
