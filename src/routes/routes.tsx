import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import ForgotPassword from "@/pages/(auth)/ForgotPassword/ForgotPassword";
import GoogleCallback from "@/pages/(auth)/GoogleCallBack/GoogleCallBack";
import Login from "@/pages/(auth)/Login/Login";
import Register from "@/pages/(auth)/Register/Register";
import ResetPassword from "@/pages/(auth)/ResetPassword/ResetPassword";
import Home from "@/pages/Home";
import { ReactNode } from "react";

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
        ],
      },
    ],
  },
];
