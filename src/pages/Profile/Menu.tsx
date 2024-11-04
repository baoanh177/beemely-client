import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { CiHeart, CiUser } from "react-icons/ci";
import { PiCodesandboxLogoThin, PiMapPinLight } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";


type ProfileItem = {
    key: string;
    label: string;
    path: string;
    icon: ReactNode;
};

const profileItems: ProfileItem[] = [
    {
        key: 'personal',
        label: 'Thông tin tài khoản',
        path: 'profile/',
        icon: < CiUser size={24} />
    },
    {
        key: 'orders',
        label: 'Đơn hàng của tôi',
        path: 'profile/orders',
        icon: <PiCodesandboxLogoThin size={24} />

    },
    {
        key: 'wishlists',
        label: 'Yêu thích',
        path: 'profile/wishlists',
        icon: <CiHeart size={24} />

    },
    {
        key: 'address',
        label: 'Quản lý địa chỉ',
        path: 'profile/address',
        icon: <PiMapPinLight size={24} />

    },
    {
        key: 'notifications',
        label: 'Thông báo',
        path: 'profile/notification',
        icon: <IoIosNotificationsOutline size={24} />


    }
];
const Menu = () => {
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('personal');
    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {profileItems.map((item, index) => (
                    <li
                        key={index}
                        className={clsx(
                            "flex flex-1 sm:flex-none items-center text-[14px] gap-2 py-2 p-4 cursor-pointer border-t border-transparent",
                            selectedKey === item.key && "text-white-500 bg-primary-500"
                        )}
                        onClick={() => {
                            if (item.path) {
                                setSelectedKey(item.key);
                                navigate(item.path);
                            }
                        }}
                    >
                            {item.icon}
                            {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;