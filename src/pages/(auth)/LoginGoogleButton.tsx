import Button from "@/components/common/Button";
import { FcGoogle } from "react-icons/fc";

const LoginGoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google/redirect`);
      const data = await response.json();
      window.location.href = data.metaData;
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };
  return (
    <Button
      variant="secondary"
      className=""
      size="full"
      onClick={handleGoogleLogin}
      text="Tiếp tục với tài khoản Google"
      icon={<FcGoogle className="mr-2 h-5 w-5" />}
    />
  );
};

export default LoginGoogleButton;
