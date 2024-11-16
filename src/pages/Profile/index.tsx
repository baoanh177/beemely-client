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
    <div className="mx-auto flex max-w-[1272px] flex-col gap-8 p-4">
      <h1 className="text-3xl font-normal">Hồ sơ của tôi</h1>
      <div className="flex w-full gap-12 pb-[120px]">
        <div className="max-h-[370px] w-full max-w-[250px] border border-gray-20%">
          <div className="flex items-center gap-4 border-b-gray-20% p-4">
            <img className="h-[60px] w-[60px] shrink-0 rounded-full object-cover" src={state.profile?.avatarUrl} alt={state.profile?.fullName} />
            <div className="flex flex-col gap-2">
              <div>
                Chao xìn <span>👋</span>
              </div>
              <div className="font-semibold">{state.profile?.fullName}</div>
            </div>
          </div>
          <div className="border-1 border-b border-gray-20%"></div>
          <div className="py-6">
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
