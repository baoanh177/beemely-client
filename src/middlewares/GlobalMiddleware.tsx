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
import { getProducts } from "@/services/store/product/product.thunk";
import { IColor, IProduct, IProductType, ISize } from "@/services/store/product/product.model";
import { IAuthInitialState, resetStatus as resetAuthStatus } from "@/services/store/auth/auth.slice";
import { ICartInitialState, resetStatus as resetCartStatus } from "@/services/store/cart/cart.slice";
import { IColorInitialState, resetStatus as resetColorsStatus } from "@/services/store/color/color.slice";
import { ISizeInitialState, resetStatus as resetSizesStatus } from "@/services/store/size/size.slice";
import { IProductInitialState, resetStatus as resetProductsStatus } from "@/services/store/product/product.slice";
import { IProductTypeInitialState, resetStatus as resetProductTypesStatus } from "@/services/store/product-type/product-type.slice";
import { getAllColor } from "@/services/store/color/color.thunk";
import { getAllSize } from "@/services/store/size/size.thunk";

export interface IGlobalMiddlewareContext {
  profile: IUserProfile | null;
  products: IProduct[] | null;
  productTypes: IProductType[] | null;
  colors: IColor[] | null;
  sizes: ISize[] | null;
  cart: ICart | null;
  isLogin: boolean;
  isNewUser: boolean;
}

const GlobalMiddleware = () => {
  const { state: authState, dispatch: authDispatch } = useArchive<IAuthInitialState>("auth");
  const { state: cartState, dispatch: cartDispatch } = useArchive<ICartInitialState>("cart");
  const { state: productsState, dispatch: productsDispatch } = useArchive<IProductInitialState>("products");
  const { state: productTypesState, dispatch: productTypesDispatch } = useArchive<IProductTypeInitialState>("productTypes");
  const { state: colorsState, dispatch: colorsDispatch } = useArchive<IColorInitialState>("colors");
  const { state: sizesState, dispatch: sizesDispatch } = useArchive<ISizeInitialState>("sizes");

  const { getProfileLoading, getCartLoading, getProductsLoading, getColorsLoading, getSizesLoading } = useAsyncEffect(
    (async) => {
      async(authDispatch(getProfile()), "getProfileLoading");
      async(cartDispatch(getCartByUser()), "getCartLoading");
      async(productsDispatch(getProducts()), "getProductsLoading");
      async(colorsDispatch(getAllColor()), "getColorsLoading");
      async(sizesDispatch(getAllSize()), "getSizesLoading");
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
    if (productsState.status !== EFetchStatus.IDLE && productsState.status !== EFetchStatus.PENDING) {
      productsDispatch(resetProductsStatus());
    }
  }, [productsState.status]);

  useEffect(() => {
    if (productTypesState.status !== EFetchStatus.IDLE && productTypesState.status !== EFetchStatus.PENDING) {
      productTypesDispatch(resetProductTypesStatus());
    }
  }, [productTypesState.status]);

  useEffect(() => {
    if (colorsState.status !== EFetchStatus.IDLE && colorsState.status !== EFetchStatus.PENDING) {
      colorsDispatch(resetColorsStatus());
    }
  }, [colorsState.status]);

  useEffect(() => {
    if (sizesState.status !== EFetchStatus.IDLE && sizesState.status !== EFetchStatus.PENDING) {
      sizesDispatch(resetSizesStatus());
    }
  }, [sizesState.status]);

  if (getProfileLoading ?? getCartLoading ?? getProductsLoading ?? getColorsLoading ?? getSizesLoading ?? true) return <Loading />;

  return (
    <Outlet
      context={
        {
          profile: authState.profile,
          cart: cartState.cart,
          isLogin: authState.isLogin,
          isNewUser: authState.isNewUser,
          colors: colorsState.colors,
          sizes: sizesState.sizes,
          products: productsState.products,
          productTypes: productTypesState.productTypes,
        } as IGlobalMiddlewareContext
      }
    />
  );
};

export default GlobalMiddleware;
