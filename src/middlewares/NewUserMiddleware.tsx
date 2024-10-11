import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { IGlobalMiddlewareContext } from "./GlobalMiddleware";

const NewUserMiddleware = () => {
  const { isNewUser } = useOutletContext<IGlobalMiddlewareContext>();
  return isNewUser ? <Outlet /> : <Navigate to="/" />;
};

export default NewUserMiddleware;
