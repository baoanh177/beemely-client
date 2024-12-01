import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import Loading from "@/pages/Loading/Loading";
import { IUserProfile } from "@/services/store/auth/auth.model";
import { getProfile } from "@/services/store/auth/auth.thunk";
import { ICart } from "@/services/store/cart/cart.model";
import { getCartByUser } from "@/services/store/cart/cart.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { IAuthInitialState, resetStatus as resetAuthStatus } from "@/services/store/auth/auth.slice";
import { ICartInitialState, resetStatus as resetCartStatus } from "@/services/store/cart/cart.slice";
import { IWishListInitialState } from "@/services/store/wishlist/wishlist.slice";
import { getAllWishList } from "@/services/store/wishlist/wishlist.thunk";
import { IProduct } from "@/services/store/product/product.model";

export interface IGlobalMiddlewareContext {
  profile: IUserProfile | null;
  cart: ICart | null;
  isLogin: boolean;
  isNewUser: boolean;
  wishlist: IProduct[] | null;
}

const GlobalMiddleware = () => {
  const { state: authState, dispatch: authDispatch } = useArchive<IAuthInitialState>("auth");
  const { state: cartState, dispatch: cartDispatch } = useArchive<ICartInitialState>("cart");
  const { state: wishlistState, dispatch: wishlistDispatch } = useArchive<IWishListInitialState>("wishlist");

  const { getProfileLoading, getCartLoading, getWishlistLoading } = useAsyncEffect(
    (async) => {
      async(authDispatch(getProfile()), "getProfileLoading");
      async(cartDispatch(getCartByUser()), "getCartLoading");
      async(wishlistDispatch(getAllWishList({})), "getWishlistLoading");
    },
    [authState.loginTime],
  );
  useEffect(() => {
    if (authState.status !== EFetchStatus.IDLE && authState.status !== EFetchStatus.PENDING) {
      authDispatch(resetAuthStatus());
    }
  }, [authState.status]);

  useEffect(() => {
    if (cartState.status !== EFetchStatus.IDLE && cartState.status !== EFetchStatus.PENDING) {
      cartDispatch(resetCartStatus());
    }
  }, [cartState.status]);
  
  useEffect(() => {
    if (wishlistState.status !== EFetchStatus.IDLE && wishlistState.status !== EFetchStatus.PENDING) {
      cartDispatch(resetCartStatus());
    }
  }, [wishlistState.status]);

  if (getProfileLoading ?? getCartLoading ?? getWishlistLoading ?? true) return <Loading />;

  return (
    <Outlet
      context={
        {
          profile: authState.profile,
          cart: cartState.cart,
          wishlist: wishlistState.wishlist,
          isLogin: authState.isLogin,
          isNewUser: authState.isNewUser,
        } as IGlobalMiddlewareContext
      }
    />
  );
};

export default GlobalMiddleware;
