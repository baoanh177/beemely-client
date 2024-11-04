
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useEffect } from "react";
import { getProfile } from "@/services/store/auth/auth.thunk";

const ProfilePage = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>('auth');
  useEffect(() => {
    dispatch(getProfile());
  }, [])

  return (
    <div className="max-w-[1272px] mx-auto p-4 flex flex-col gap-8 ">
      <h1 className="text-3xl font-normal">My Profile</h1>
      <div className="flex w-full gap-12">
        <div className="max-w-[250px] w-full border border-gray-20% max-h-[370px]">
          <div className="flex gap-4 items-center p-4 border-b-gray-20%">
            <img className="w-[60px] h-[60px] object-cover rounded-full shrink-0" src={state.profile?.avatarUrl} alt={state.profile?.fullName} />
            <div className="flex flex-col gap-2 ">
              <div>Chao xìn <span>👋</span></div>
              <div className="font-semibold">{state.profile?.fullName}</div>
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
