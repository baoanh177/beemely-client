import AuthWrapper from "../AuthWrapper";
import RegisterForm from "../RegisterForm";
import registerImage from "@/assets/images/register-page.png";

const Register = () => {
  return (
    <AuthWrapper imageUrl={registerImage}>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default Register;
