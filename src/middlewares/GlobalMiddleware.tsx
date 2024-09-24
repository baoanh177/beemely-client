import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import Loading from "@/pages/Loading/Loading";
import { IUserProfile } from "@/services/store/auth/auth.model";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { getProfile } from "@/services/store/auth/auth.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export interface IGlobalMiddlewareContext {
  profile: IUserProfile | null;
  isLogin: boolean;
}

const GlobalMiddleware = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const { getProfileLoading } = useAsyncEffect((async) => {
    async(dispatch(getProfile()), "getProfileLoading");
  }, [state.loginTime]);

  useEffect(() => {
    if (state.status !== EFetchStatus.IDLE && state.status !== EFetchStatus.PENDING) {
      dispatch(resetStatus());
    }
  }, [state.status]);
  if (getProfileLoading ?? true) return <Loading />;

  return <Outlet context={{ profile: state.profile, isLogin: state.isLogin } as IGlobalMiddlewareContext} />;
};

export default GlobalMiddleware;
