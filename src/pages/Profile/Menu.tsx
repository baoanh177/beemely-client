import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { CiHeart, CiUser } from "react-icons/ci";
import { PiCodesandboxLogoThin, PiMapPinLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
type ProfileItem = {
  key: string;
  label: string;
  path: string;
  icon: ReactNode;
};

const profileItems: ProfileItem[] = [
  {
    key: "personal",
    label: "Thông tin tài khoản",
    path: "profile/",
    icon: <CiUser size={24} />,
  },
  {
    key: "orders",
    label: "Đơn hàng của tôi",
    path: "profile/orders",
    icon: <PiCodesandboxLogoThin size={24} />,
  },
  {
    key: "wishlists",
    label: "Yêu thích",
    path: "profile/wishlists",
    icon: <CiHeart size={24} />,
  },
  {
    key: "address",
    label: "Quản lý địa chỉ",
    path: "profile/address",
    icon: <PiMapPinLight size={24} />,
  },
  {
    key: "review-history",
    label: "Lịch sử đánh giá",
    path: "profile/review-history",
    icon: <CiStar size={24} />,
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace("/profile/", "");
  const mainPath = currentPath.split("/")[0];

  const selectedKey = profileItems.find((item) => item.key === mainPath)?.key || "personal";

  return (
    <ul className="flex gap-2 lg:flex-col">
      {profileItems.map((item, index) => (
        <li
          key={index}
          className={clsx(
            "flex flex-1 cursor-pointer items-center gap-2 border-t border-transparent p-4 py-2 text-[14px] sm:flex-none",
            selectedKey === item.key && "bg-primary-500 text-white-500",
          )}
          onClick={() => {
            if (item.path) {
              navigate(item.path);
            }
          }}
        >
          {item.icon}
          <div className="hidden lg:block">{item.label}</div>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
