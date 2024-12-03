import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useEffect } from "react";
import { getProfile } from "@/services/store/auth/auth.thunk";
import { Container } from "@/styles/common-styles";

const ProfilePage = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-normal">Hồ sơ của tôi</h1>
      <div className="flex w-full flex-col gap-3 pb-[120px] lg:flex-row lg:gap-6">
        <div className="mb-6 flex w-full flex-row flex-wrap items-center justify-between gap-1 py-3 lg:mb-0 lg:max-w-[250px] lg:flex-col lg:justify-normal">
          <div className="flex flex-row items-center gap-4 border-gray-20% p-2 lg:w-full lg:border-b lg:p-4">
            {state.profile?.avatarUrl ? (
              <img
                className="h-[35px] w-[35px] shrink-0 rounded-full object-cover lg:h-[60px] lg:w-[60px]"
                src={state.profile?.avatarUrl}
                alt={state.profile?.fullName}
              />

            ) : (
              <div className="h-[35px] w-[35px] shrink-0 rounded-full object-cover lg:h-[60px] lg:w-[60px] flex text-xl items-center justify-center bg-blue-500">
              {state.profile?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            )}

            <div className="flex flex-row gap-2 lg:flex-col">
              <div className="inline-block font-semibold lg:hidden">{state.profile?.fullName}</div>
              <div className="hidden lg:inline-block">
                Chao xìn <span>👋</span>
              </div>
              <div className="font-semibold">{state.profile?.fullName}</div>
            </div>
          </div>
          <div className="flex p-2 lg:block lg:w-full lg:justify-center lg:p-0 lg:py-6">
            <Menu />
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
