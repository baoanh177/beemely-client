import { Link } from "react-router-dom";

interface ButtonLoginProps {
  className?: string;
}

const ButtonLogin = ({ className = "" }: ButtonLoginProps) => {
  return (
    <Link
      to="/auth/login"
      className={`hover:bg-dark-600 inline-block rounded-full bg-dark-500 px-6 py-2 text-center text-white-500 transition-colors ${className}`}
    >
      Đăng nhập
    </Link>
  );
};

export default ButtonLogin;
