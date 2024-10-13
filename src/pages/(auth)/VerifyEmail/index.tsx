import AuthWrapper from "../AuthWrapper";
import resetPasswordImage from "@/assets/images/resetpassword-page.png";
import VerifyEmailForm from "../VeriryEmailForm";

const VerifyEmailPage = () => {
  return (
    <AuthWrapper imageUrl={resetPasswordImage}>
      <VerifyEmailForm />
    </AuthWrapper>
  );
};

export default VerifyEmailPage;
