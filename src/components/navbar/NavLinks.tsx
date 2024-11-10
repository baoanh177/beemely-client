import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links } from "./StoreLinks";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface NavLinkType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinks = ({ setOpen }: NavLinkType) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    setOpen(false);
    setHeading("");
    setSubHeading("");
  };

  return (
    <>
      {links.map((link) => (
        <div key={link.name}>
          <div className="group px-3 text-left md:cursor-pointer">
            <h1
              className="group flex items-center justify-between py-7 pr-5 md:pr-0"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              <Link to={link.navLink || "#"} className="hover:text-primary" onClick={() => handleLinkClick(link.navLink || "#")}>
                {link.name}
              </Link>
              <span className="inline text-xl md:hidden">
                {link?.submenu && (heading === link.name ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />)}
              </span>
              <span className="hidden text-xl group-hover:-mt-2 group-hover:rotate-180 md:ml-2 md:mt-1 md:block">
                {link?.submenu && <FaChevronDown size={12} />}
              </span>
            </h1>

            {link.submenu && (
              <div>
                <div className="absolute top-20 z-50 hidden hover:md:block group-hover:md:block">
                  <div className="py-3">
                    <div className="absolute left-3 mt-1 h-4 w-4 rotate-45 bg-white-500"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-10 bg-white-500 p-5">
                    {link?.sublinks?.map((mysublinks) => (
                      <div key={mysublinks.Head}>
                        <h1 className="text-lg font-semibold">{mysublinks.Head}</h1>
                        {mysublinks.sublink.map((slink) => (
                          <li key={slink.name} className="text-gray-600 my-2.5 text-sm">
                            <Link to={slink.link} className="hover:text-primary" onClick={() => handleLinkClick(slink.link)}>
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menus */}
          <div className={`${heading === link.name ? "md:hidden" : "hidden"}`}>
            {link.sublinks &&
              link.sublinks.map((slinks) => (
                <div key={slinks.Head}>
                  <div>
                    <h1
                      onClick={() => (subHeading !== slinks.Head ? setSubHeading(slinks.Head) : setSubHeading(""))}
                      className="flex items-center justify-between py-4 pl-7 pr-5 font-semibold md:pr-0"
                    >
                      {slinks.Head}
                      <span className="inline text-xl md:ml-2 md:mt-1">
                        {subHeading === slinks.Head ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                      </span>
                    </h1>

                    <div className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"}`}>
                      {slinks.sublink.map((slink) => (
                        <li key={slink.name} className="py-3 pl-14">
                          <Link to={slink.link} className="hover:text-primary" onClick={() => handleLinkClick(slink.link)}>
                            {slink.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
