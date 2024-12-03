interface ButtonLoginProps {
  className?: string;
}

const ButtonLogin = ({ className = "" }: ButtonLoginProps) => {
  const handleLoginClick = () => {
    window.location.href = "/auth/login";
  };

  return (
    <button
      onClick={handleLoginClick}
      className={`hover:bg-dark-600 inline-block rounded-full bg-dark-500 px-6 py-2 text-center text-white-500 transition-colors ${className}`}
    >
      Đăng nhập
    </button>
  );
};

export default ButtonLogin;
