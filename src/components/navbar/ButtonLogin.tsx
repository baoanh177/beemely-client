import { Link } from "react-router-dom";

const ButtonLogin = () => {
  return (
    <Link to="auth/login" className="text-white bg-primary rounded-md px-4 py-2">
      <button className="text-white rounded-full bg-dark-500 px-6 py-2 text-white-500">Đăng nhập</button>
    </Link>
  );
};

export default ButtonLogin;
