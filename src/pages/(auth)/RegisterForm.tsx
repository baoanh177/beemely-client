import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string, ref, boolean } from "yup";
import { register } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { Divider } from "antd";
import FormInput from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import { MdOutlineEmail } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FiLock } from "react-icons/fi";
import SocialLoginButton from "@/components/common/SocialLoginButton";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/common/Button";
import FormCheck from "@/components/form/FormCheck";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import ConfirmModal from "@/components/modal/ConfirmModal";
import VerifyEmailForm from "./VeriryEmailForm";

interface IRegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  is_agree: boolean;
}

const RegisterForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const { isOpen, onOpen } = useConfirmModal();
  const handleLogin = (data: IRegisterFormData) => {
    const { confirm_password, is_agree, ...registerData } = data;
    dispatch(register({ body: registerData }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: onOpen,
      error: {
        message: state.message,
      },
    },
  });

  const initialValues: IRegisterFormData = { full_name: "", email: "", password: "", confirm_password: "", is_agree: false };

  const validateSchema = object().shape({
    full_name: string().required("Vui lòng nhập tên"),
    email: string().email("Email không hợp lệ!").required("Vui lòng nhập email!"),
    password: string().required("Vui lòng nhập mật khẩu"),
    confirm_password: string().oneOf([ref("password"), undefined], "Mật khẩu nhập lại không khớp"),
    is_agree: boolean().isTrue("Vui lòng đồng ý các điều khoản").required("Vui lòng đồng ý các điều khoản"),
  });

  return (
    <>
      {isOpen && (
        <ConfirmModal isOpen={isOpen}>
          <VerifyEmailForm />
        </ConfirmModal>
      )}
      <div className="flex w-full flex-col items-center md:max-w-2xl md:items-start">
        <h1 className="flex items-center text-3xl font-bold text-gray-900">Tạo tài khoản mới!</h1>
        <div className="mt-8 flex w-full flex-col gap-3 px-4">
          {state.status === EFetchStatus.REJECTED && state.message && <FormError message={state.message} />}
          <Formik
            validationSchema={validateSchema}
            initialValues={initialValues}
            validateOnBlur
            onSubmit={(data) => {
              if (validateSchema.isValidSync(data)) {
                handleLogin(data);
              }
            }}
          >
            {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
              return (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <FormInput
                    icon={GoPerson}
                    label="Tên của bạn"
                    type="text"
                    value={values.full_name}
                    isDisabled={state.status === EFetchStatus.PENDING}
                    error={(errors.full_name && touched.full_name && errors.full_name) || ""}
                    name="full_name"
                    onChange={(value) => {
                      setFieldValue("full_name", value);
                    }}
                    onBlur={handleBlur}
                    placeholder="Nhập tên của bạn"
                  />
                  <FormInput
                    icon={MdOutlineEmail}
                    label="Email"
                    type="text"
                    value={values.email}
                    isDisabled={state.status === EFetchStatus.PENDING}
                    error={(errors.email && touched.email && errors.email) || ""}
                    name="email"
                    onChange={(value) => {
                      setFieldValue("email", value);
                    }}
                    onBlur={handleBlur}
                    placeholder="Nhập email"
                  />
                  <FormInput
                    icon={FiLock}
                    label="Mật Khẩu"
                    type="password"
                    name="password"
                    value={values.password}
                    isDisabled={state.status === EFetchStatus.PENDING}
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("password", value);
                    }}
                    error={(errors.password && touched.password && errors.password) || ""}
                    placeholder="******"
                  />
                  <FormInput
                    icon={FiLock}
                    label="Nhập lại mật khẩu"
                    type="password"
                    name="confirm_password"
                    value={values.confirm_password}
                    isDisabled={state.status === EFetchStatus.PENDING}
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("confirm_password", value);
                    }}
                    error={(errors.confirm_password && touched.confirm_password && errors.confirm_password) || ""}
                    placeholder="******"
                  />
                  <FormCheck
                    id="form-check-agree"
                    name="status"
                    label="Tôi đồng ý với Điều khoản & Điều kiện"
                    checked={values.is_agree}
                    onChange={(value) => {
                      setFieldValue("is_agree", value);
                    }}
                    error={errors.is_agree}
                  />
                  <Button className="py-6" variant="primary" type="submit" isDisabled={state.status === EFetchStatus.PENDING} text="Đăng ký" />
                </form>
              );
            }}
          </Formik>
          <div className="flex items-center justify-center">
            <p>Bạn đã có tài khoản?</p>
            <Link className="ml-2 font-medium hover:underline" to={"/auth/login"}>
              Đăng nhập
            </Link>
          </div>
          <Divider variant="solid">Hoặc</Divider>
          <SocialLoginButton
            onClick={() => {
              fetch(`${import.meta.env.VITE_API_URL}/api/auth/google/redirect`)
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  window.location.href = data.metaData;
                });
            }}
            text="tiếp tục với Google"
            icon={FcGoogle}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
