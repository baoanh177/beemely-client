import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useEffect } from "react";
import { getProfile } from "@/services/store/auth/auth.thunk";

const ProfilePage = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="mx-auto flex max-w-[1360px] flex-col gap-8 p-4">
      <h1 className="text-3xl font-normal">Hồ sơ của tôi</h1>
      <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-6 pb-[120px]">
        <div className="lg:max-w-[250px] w-full border items-center py-3 border-gray-20% flex mb-6 lg:mb-0 flex-row justify-between lg:justify-normal gap-1 flex-wrap lg:flex-col">
          <div className="flex flex-row items-center gap-4  lg:border-b border-gray-20% p-2 lg:p-4 lg:w-full">
            <img
              className="h-[35px] w-[35px] lg:h-[60px] lg:w-[60px] shrink-0 rounded-full object-cover"
              src={state.profile?.avatarUrl}
              alt={state.profile?.fullName}
            />
            <div className="flex flex-row lg:flex-col gap-2">
              <div className="inline-block lg:hidden font-semibold">{state.profile?.fullName}</div>
              <div className="hidden lg:inline-block">
                Chao xìn <span>👋</span>
              </div>
              <div className="font-semibold">{state.profile?.fullName}</div>
            </div>
          </div>
          <div className="p-2 lg:p-0 lg:py-6 flex lg:justify-center lg:block lg:w-full">
            <Menu />
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
