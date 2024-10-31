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
import ProfilePage from "@/pages/Profile";
import GetStartedPage from "@/pages/GetStarted";
import ProductPage from "@/pages/ProductPage";
import { Components } from "@/pages/Components/Components";
import DefaultLayout from "@/layouts/Default";
// import ShippingAddress from "@/pages/(checkout)/ShippingAddress";
// import PaymentMethod from "@/pages/(checkout)/PaymentMethod";
import Orders from "@/pages/Profile/Order/Orders";
import Wishlist from "@/pages/Profile/Wishlists/Wishlist";
import Personal from "@/pages/Profile/Personal/Personal";
import Address from "@/pages/Profile/Address/Address";
import Notifications from "@/pages/Profile/Notifications/Notifications";
import CheckoutPage from "@/pages/(checkout)/Checkout";
import PaymentPage from "@/pages/(checkout)/Payment";

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
            path: "product/:id",
            element: () => <ProductPage />,
          },
        ],
      },
      {
        path: "profile",
        layout: () => <DefaultLayout />,
        // middleware: () => <AuthMiddleware />,
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
                path: "/wishlists",
                element: Wishlist,
              },
              {
                path: "/address",
                element: Address,
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
