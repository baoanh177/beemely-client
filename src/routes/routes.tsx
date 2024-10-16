import { ReactNode } from "react";

//middle ware
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

//auth router
import ForgotPassword from "@/pages/(auth)/ForgotPassword";
import GoogleCallback from "@/pages/(auth)/GoogleCallBack";
import Login from "@/pages/(auth)/Login";
import Register from "@/pages/(auth)/Register";
import ResetPassword from "@/pages/(auth)/ResetPassword";

//site router
import Home from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import VerifyEmailPage from "@/pages/(auth)/VerifyEmail";
import GetStartedPage from "@/pages/GetStarted";
import NewUserMiddleware from "@/middlewares/NewUserMiddleware";
import { Components } from "@/pages/Components/Components";
import DefaultLayout from "@/layouts/Default";
import ShippingAddress from "@/pages/(checkout)/ShippingAddress";
import PaymentMethod from "@/pages/(checkout)/PaymentMethod";

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
        path: "/",
        element: () => <Home />,
      },
      {
        path: "/components",
        element: () => <Components />,
      },
      {
        path: "",
        middleware: () => <AuthMiddleware />,
        pages: [
          {
            path: "profile",
            element: () => <ProfilePage />,
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
      {
        path: "/checkout",
        layout: () => <DefaultLayout />,
        pages: [
          {
            path: "/shipping-address",
            element: () => <ShippingAddress />
          },
          {
            path: "/payment-method",
            element: () => <PaymentMethod />
          }
        ]
      }
    ],
  },
];
