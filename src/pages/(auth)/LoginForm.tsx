import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { Divider } from "antd";

import Button from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { login } from "@/services/store/auth/auth.thunk";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import LoginGoogleButton from "./LoginGoogleButton";

interface ILoginFormData {
  email: string;
  password: string;
}

const validateSchema = object().shape({
  email: string().email("Email không hợp lệ!").required("Vui lòng nhập email!"),
  password: string().required("Vui lòng nhập mật khẩu"),
});

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
        message: "Đăng nhập thành công!",
        navigate: state.isNewUser ? "/get-started" : "/",
      },
      error: {
        message: state.message,
      },
    },
  });

  const loginFormInitialValues: ILoginFormData = { email: "", password: "" };

  return (
    <div className="w-full space-y-5 px-4 md:max-w-xl">
      <div className="space-y-2">
        <h1 className="text-gray-900 flex items-center text-2xl font-bold md:text-4xl">Đăng nhập</h1>
        <p className="text-sm text-gray-500 md:text-base">Đăng nhập ngay để bắt đầu mua sắm các sản phẩm nổi bật</p>
      </div>
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
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <FormInput
                label="Nhập email"
                type="text"
                value={values.email}
                isDisabled={state.status === EFetchStatus.PENDING}
                error={(touched.email && errors.email) || ""}
                name="email"
                onChange={(value) => {
                  setFieldValue("email", value);
                }}
                onBlur={handleBlur}
                placeholder="beemely@example.com"
              />
              <FormInput
                label="Nhập mật khẩu"
                type="password"
                name="password"
                value={values.password}
                isDisabled={state.status === EFetchStatus.PENDING}
                onBlur={handleBlur}
                onChange={(value) => {
                  setFieldValue("password", value);
                }}
                error={(touched.password && errors.password) || ""}
                placeholder="******"
              />
              <div className="flex justify-end">
                <Link to="/auth/forgot-password" className="text-sm font-medium hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                className="py-6"
                variant="primary"
                type="submit"
                isLoading={state.status === EFetchStatus.PENDING}
                isDisabled={state.status === EFetchStatus.PENDING}
                text="Đăng nhập"
              />
            </Form>
          );
        }}
      </Formik>
      <div className="flex items-center justify-center text-sm">
        <p>Bạn chưa có tài khoản?</p>
        <Link className="ml-2 font-medium hover:underline" to={"/auth/register"}>
          Đăng Ký
        </Link>
      </div>
      <Divider variant="solid" className="my-1">
        Hoặc
      </Divider>
      <LoginGoogleButton />
    </div>
  );
};

export default LoginForm;
