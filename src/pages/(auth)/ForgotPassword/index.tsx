import { Link } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import ForgotPasswordForm from "../ForgotPasswordForm";
import forgotPasswordImage from "@/assets/images/forgotpassword-page.png";
import { IoChevronBack } from "react-icons/io5";

const ForgotPassword = () => {
  return (
    <AuthWrapper imageUrl={forgotPasswordImage}>
      <div className="flex flex-col space-y-6">
        <div className="px-4">
          <Link to="/auth/login" className="flex items-center">
            <IoChevronBack className="mr-2 h-5 w-5" />
            <span className="font-medium">Quay lại</span>
          </Link>
        </div>
        <ForgotPasswordForm />
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
