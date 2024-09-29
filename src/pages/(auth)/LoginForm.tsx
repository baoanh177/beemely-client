import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { Divider } from "antd";
import { FcGoogle } from "react-icons/fc";

import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { login } from "@/services/store/auth/auth.thunk";
import FormInput from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import SocialLoginButton from "@/components/common/SocialLoginButton";
import Button from "@/components/common/Button";

interface ILoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const handleLogin = (data: ILoginFormData) => {
    dispatch(login({ body: data }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Logged in successfully",
        navigate: "/",
      },
      error: {
        message: state.message,
      },
    },
  });

  const loginFormInitialValues: ILoginFormData = { email: "", password: "" };

  const validateSchema = object().shape({
    email: string().email("Email không hợp lệ!").required("Vui lòng nhập email!"),
    password: string().required("Vui lòng nhập mật khẩu"),
  });

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col space-y-2">
        <h1 className="flex items-center text-4xl font-bold text-gray-900">Chào mừng trở lại!</h1>
        <p className="text-gray-500">Đăng nhập ngay để bắt đầu mua sắm các sản phẩm nổi bật của chúng tôi</p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {state.status === EFetchStatus.REJECTED && state.message && <FormError message={state.message} />}
        <Formik
          validationSchema={validateSchema}
          initialValues={loginFormInitialValues}
          validateOnBlur
          onSubmit={(data) => {
            handleLogin(data);
          }}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
            return (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormInput
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
                  placeholder="beemely@example.com"
                />
                <FormInput
                  label="Password"
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
                <div className="flex justify-end">
                  <Link to="/auth/forgot-password" className="text-sm font-medium hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
                <Button className="py-6" variant="primary" type="submit" isDisabled={state.status === EFetchStatus.PENDING} text="Đăng nhập" />
              </form>
            );
          }}
        </Formik>
        <div className="flex items-center justify-center">
          <p>Bạn chưa có tài khoản?</p>
          <Link className="ml-2 font-medium hover:underline" to={"/auth/register"}>
            Đăng Ký
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
  );
};

export default LoginForm;
