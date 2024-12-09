import { Dropdown, MenuProps, message } from "antd";
import { UserOutlined, MailOutlined, SettingOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useArchive } from "@/hooks/useArchive";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { logout } from "@/services/store/auth/auth.thunk";

interface UserDropdownProps {
  isMobile: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isMobile }) => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const { profile } = state;

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      message.success("Bạn đã đăng xuất!");
      window.location.reload();
    } catch (error) {
      message.error("Có lỗi trong quá trình đăng xuất");
    }
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  const menuItems = [
    { key: "profile", icon: <UserOutlined />, label: "Hồ sơ", href: "/profile" },
    { key: "inbox", icon: <MailOutlined />, label: "Hộp thư đến", href: "/inbox" },
    { key: "settings", icon: <SettingOutlined />, label: "Cài đặt", href: "/settings" },
  ];

  const items: MenuProps["items"] = [
    ...menuItems.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: <Link to={item.href}>{item.label}</Link>,
    })),
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]} placement="bottomRight">
      <div className={clsx("flex cursor-pointer items-center rounded-full", isMobile ? "p-1" : "bg-gray-50 hover:bg-gray-100 gap-2 px-3 py-2")}>
        <div className={clsx("overflow-hidden rounded-full bg-blue-100", isMobile ? "h-6 w-6" : "h-8 w-8")}>
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={`${profile.fullName}'s avatar`} className="h-full w-full object-cover" />
          ) : (
            <div className="text-white flex h-full w-full items-center justify-center bg-blue-500">
              {profile?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        {!isMobile && (
          <>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{profile?.fullName || "User Name"}</span>
            </div>
            <DownOutlined className="h-3 w-3" />
          </>
        )}
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
