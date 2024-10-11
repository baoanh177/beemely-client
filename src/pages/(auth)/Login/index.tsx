import LoginForm from "@/pages/(auth)/LoginForm";
import AuthWrapper from "../AuthWrapper";
import loginImage from "@/assets/images/login-page.png";

const Login = () => {
  return (
    <AuthWrapper imageUrl={loginImage}>
      <LoginForm />
    </AuthWrapper>
  );
};

export default Login;
