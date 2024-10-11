import { useState, useRef, useEffect } from "react";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined, SearchOutlined, HeartOutlined, ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { Container } from "@/styles/common-styles";
import logo from "@/assets/images/logo.png";

const menuItems = [
  { id: "home", title: "Home", navLink: "/" },
  {
    id: "shop",
    title: "Shop",
    navLink: "/apps/shop",
    children: [
      {
        title: "Men",
        items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Jackets", "Blazers & Coats"],
      },
      {
        title: "Women",
        items: ["Kurtas & Suits", "Sarees", "Ethnic Wear", "Lehenga Cholis", "Jackets"],
      },
      {
        title: "Footwear",
        items: ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"],
      },
      {
        title: "Kids",
        items: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Party Wear"],
      },
    ],
  },
  {
    id: "our-story",
    title: "Our Story",
    navLink: "/apps/our-story",
  },
  {
    id: "blog",
    title: "Blog",
    navLink: "/apps/blog",
    children: [
      {
        title: "Fashion",
        items: ["Trends", "Outfits", "Accessories", "Seasonal Wear"],
      },
      {
        title: "Lifestyle",
        items: ["Health", "Travel", "Food", "Wellness"],
      },
      {
        title: "Beauty",
        items: ["Skincare", "Makeup", "Haircare", "Fragrances"],
      },
    ],
  },
  { id: "contact-us", title: "Contact Us", navLink: "/apps/contact-us" },
];

const NavBarAntd = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (navLink: string) => location.pathname === navLink;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (Object.values(menuRefs.current).some((ref) => ref && ref.contains(event.target as Node))) {
        return;
      }
      setOpenSubMenu(null);
    };

    const handleMouseOver = (event: MouseEvent) => {
      if (Object.values(menuRefs.current).some((ref) => ref && ref.contains(event.target as Node))) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      } else {
        hideTimeoutRef.current = setTimeout(() => {
          setOpenSubMenu(null);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseover", handleMouseOver);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const SubMenu = ({ children, id }: { children: React.ReactNode; id: string }) => (
    <div
      ref={(el) => (menuRefs.current[id] = el)}
      className={`submenu fixed left-0 top-16 z-50 w-full transform bg-white-500 py-6 shadow-lg transition-all duration-300 ease-in-out ${
        openSubMenu === id ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
      onMouseEnter={() => setOpenSubMenu(id)}
      onMouseLeave={() => setOpenSubMenu(null)}
    >
      <Container>
        <div className="grid grid-cols-4 gap-8">{children}</div>
      </Container>
    </div>
  );

  return (
    <div className="bg-white p-0">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <img src={logo} alt="Beemely Logo" className="h-8" />
          <nav className="hidden flex-grow justify-center md:flex">
            {menuItems.map((item) => (
              <div
                key={item.id}
                ref={(el) => (menuRefs.current[item.id] = el)}
                className={`relative cursor-pointer px-4 py-2 ${item.children ? "group" : ""}`}
                onMouseEnter={() => {
                  if (item.children) {
                    setOpenSubMenu(item.id);
                  } else {
                    setOpenSubMenu(null);
                  }
                }}
              >
                <Link
                  to={item.navLink}
                  className={`flex items-center no-underline ${isActive(item.navLink) ? "text-primary-500" : "text-gray-700"} hover:text-primary-500`}
                >
                  {item.title}
                  {item.children && <FaChevronDown size={10} className="ml-1" />}
                </Link>
                {item.children && openSubMenu === item.id && (
                  <SubMenu id={item.id}>
                    {item.children.map((category, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="mb-3 text-lg font-bold">{category.title}</h3>
                        <ul className="space-y-2 pl-4">
                          {category.items.map((subItem, subIndex) => (
                            <li key={subIndex} className="cursor-pointer text-sm hover:text-primary-500">
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </SubMenu>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center">
            <SearchOutlined className="mr-4 text-lg" />
            <HeartOutlined className="mr-4 text-lg" />
            <ShoppingCartOutlined className="mr-4 text-lg" />
            <Button type="default" className="hidden bg-dark-500 text-white-500 md:inline-block">
              Login
            </Button>
            <Button type="text" icon={<MenuOutlined />} onClick={() => setOpenMenu(true)} className="md:hidden" />
          </div>
        </div>
      </Container>
      <Drawer placement="right" onClose={() => setOpenMenu(false)} open={openMenu} closable={false} width="100%">
        <div className="flex items-center justify-between p-4">
          <img src={logo} alt="Beemely Logo" className="h-8" />
          <Button type="text" icon={<CloseOutlined />} onClick={() => setOpenMenu(false)} />
        </div>
        {/* Mobile nav */}
        <Menu mode="inline" className="border-r-0">
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.id} title={item.title}>
                {item.children.map((category, index) => (
                  <Menu.ItemGroup key={`${item.id}-${index}`} title={category.title}>
                    {category.items.map((subItem, subIndex) => (
                      <Menu.Item key={`${item.id}-${index}-${subIndex}`} className="pl-4">
                        {subItem}
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.id}>
                <Link to={item.navLink}>{item.title}</Link>
              </Menu.Item>
            ),
          )}
        </Menu>
      </Drawer>
    </div>
  );
};

export default NavBarAntd;
