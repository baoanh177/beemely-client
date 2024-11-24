import { ReactNode } from "react";

//middle ware
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import NewUserMiddleware from "@/middlewares/NewUserMiddleware";

//auth router
import ForgotPassword from "@/pages/(auth)/ForgotPassword";
import GoogleCallback from "@/pages/(auth)/GoogleCallBack";
import Login from "@/pages/(auth)/Login";
import Register from "@/pages/(auth)/Register";
import ResetPassword from "@/pages/(auth)/ResetPassword";
import VerifyEmailPage from "@/pages/(auth)/VerifyEmail";

//site router
import Home from "@/pages/Home";
import CartPage from "@/pages/Cart";
import GetStartedPage from "@/pages/GetStarted";
import ProductPage from "@/pages/ProductPage";
import { Components } from "@/pages/Components/Components";
import DefaultLayout from "@/layouts/Default";
// import ShippingAddress from "@/pages/(checkout)/ShippingAddress";
// import PaymentMethod from "@/pages/(checkout)/PaymentMethod";
import Products from "@/pages/Products";
import Wishlist from "@/pages/Profile/Wishlists/Wishlist";
import Notifications from "@/pages/Profile/Notifications/Notifications";
import Addresses from "@/pages/Profile/Address/Address";
import CheckoutPage from "@/pages/(checkout)/Checkout";
import PaymentPage from "@/pages/(checkout)/Payment";
import Personal from "@/pages/Profile/Personal/Personal";
import Orders from "@/pages/Profile/Order/Orders";
import ProfilePage from "@/pages/Profile";
import OrderDetail from "@/pages/Profile/Order/OrderDetail";
import ComplaintOrderPage from "@/pages/Profile/Order/ComplaintOrderPage";

export interface IRoute {
  path: string;
  layout?: () => ReactNode;
  middleware?: () => ReactNode;
  element?: () => ReactNode;
  pages?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: "/",
    middleware: () => <GlobalMiddleware />,
    pages: [
      {
        path: "",
        layout: () => <DefaultLayout />,
        pages: [
          {
            path: "",
            element: () => <Home />,
          },
          {
            path: "cart",
            element: () => <CartPage />,
          },
          {
            path: "checkout",
            element: () => <CheckoutPage />,
          },
          {
            path: "payment",
            element: () => <PaymentPage />,
          },

          {
            path: "/components",
            element: () => <Components />,
          },
          {
            path: "products",
            element: () => <Products />,
          },
          {
            path: "product/:id",
            element: () => <ProductPage />,
          },
        ],
      },
      {
        path: "profile",
        layout: () => <DefaultLayout />,
        middleware: () => <AuthMiddleware />,
        pages: [
          {
            path: "/",
            layout: ProfilePage,
            pages: [
              {
                path: "/",
                element: Personal,
              },
              {
                path: "/orders",
                element: Orders,
              },
              {
                path: "/orders/detail/:id",
                element: OrderDetail,
              },
              {
                path: "/orders/complaint/:orderId",
                element: ComplaintOrderPage,
              },
              {
                path: "/wishlists",
                element: Wishlist,
              },
              {
                path: "/address",
                element: Addresses,
              },
              {
                path: "/notification",
                element: Notifications,
              },
            ],
          },
        ],
      },
      {
        path: "get-started",
        middleware: () => <NewUserMiddleware />,
        element: () => <GetStartedPage />,
      },
      {
        path: "auth",
        middleware: () => <GuestMiddleware />,
        pages: [
          {
            path: "login",
            element: () => <Login />,
          },
          {
            path: "register",
            element: () => <Register />,
          },
          {
            path: "reset-password/:token",
            element: () => <ResetPassword />,
          },
          {
            path: "forgot-password",
            element: () => <ForgotPassword />,
          },
          {
            path: "google/callback",
            element: () => <GoogleCallback />,
          },
          {
            path: "verify-email",
            element: () => <VerifyEmailPage />,
          },
        ],
      },
    ],
  },
];
