
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const ProfilePage = () => {
  return (
    <div className="max-w-[1272px] mx-auto p-4 flex flex-col gap-8 ">
      <h1 className="text-3xl font-normal">My Profile</h1>
      <div className="flex w-full gap-12">
        <div className="max-w-[250px] w-full border border-gray-20% max-h-[370px]">
          <div className="flex gap-4 items-center p-4 border-b-gray-20%">
            <img className="w-[60px] h-[60px] object-cover rounded-full shrink-0" src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg" alt="123" />
            <div className="flex flex-col gap-2 ">
              <div>Hello <span>👋</span></div>
              <div className="font-semibold">Robert Fox</div>
            </div>
          </div>
          <div className="border-1 border-gray-20% border-b"></div>
          <div className="py-6">
            <Menu />
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;
