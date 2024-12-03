import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { cartSlice } from "./store/cart/cart.slice";
import { productTypesSlice } from "./store/product-type/product-type.slice";
import { colorsSlice } from "./store/color/color.slice";
import { sizesSlice } from "./store/size/size.slice";
import { gendersSlice } from "./store/gender/gender.slice";
import { checkoutSlice } from "./store/checkout/checkout.slice";
import { wishlistSlice } from "./store/wishlist/wishlist.slice";
import { orderSlice } from "./store/order/order.slice";
import { productSlice } from "./store/product/product.slice";
import { bannerSlice } from "./store/banner/banner.slice";
import { categorySlice } from "./store/category/category.slice";
import { vouchersSlice } from "./store/voucher/voucher.slice";
import { locationSlice } from "./store/location/location.slice";
import { reviewSlice } from "./store/review/review.slice";
import { brandsSlice } from "./store/brand/brand.slice";
import { complaintSlice } from "./store/complaint/complaint.slice";
import { tagSlice } from "./store/tag/tag.slice";
import { bestsellerSlice } from "./store/product/bestseller.slice";
import { interestSlice } from "./store/product/product-interest.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  productTypes: productTypesSlice.reducer,
  colors: colorsSlice.reducer,
  sizes: sizesSlice.reducer,
  genders: gendersSlice.reducer,
  checkout: checkoutSlice.reducer,
  order: orderSlice.reducer,
  wishlist: wishlistSlice.reducer,
  products: productSlice.reducer,
  banner: bannerSlice.reducer,
  category: categorySlice.reducer,
  vouchers: vouchersSlice.reducer,
  location: locationSlice.reducer,
  review: reviewSlice.reducer,
  brands: brandsSlice.reducer,
  complaints: complaintSlice.reducer,
  tags: tagSlice.reducer,
  bestsellerProducts: bestsellerSlice.reducer,
  interestProducts: interestSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
