import AuthWrapper from "../AuthWrapper";
import ResetPasswordForm from "../ResetPasswordForm";
import resetPasswordImage from "@/assets/images/resetpassword-page.png";

const ResetPassword = () => {
  return (
    <AuthWrapper imageUrl={resetPasswordImage}>
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPassword;
