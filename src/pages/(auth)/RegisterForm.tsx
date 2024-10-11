import { Divider } from "antd";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string, ref, boolean } from "yup";

import { useArchive } from "@/hooks/useArchive";
import { register } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/common/Button";
import FormCheck from "@/components/form/FormCheck";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import LoginGoogleButton from "./LoginGoogleButton";

interface IRegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  is_agree: boolean;
}

const validateSchema = object().shape({
  full_name: string().required("Vui lòng nhập tên"),
  email: string().email("Email không hợp lệ!").required("Vui lòng nhập email"),
  password: string().min(6, "Mật khẩu tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu"),
  confirm_password: string()
    .oneOf([ref("password"), undefined], "Mật khẩu nhập lại không khớp")
    .required("Nhập lại mật khẩu"),
  is_agree: boolean().isTrue("Vui lòng đồng ý các điều khoản").required("Vui lòng đồng ý các điều khoản"),
});

const RegisterForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const handleLogin = (data: IRegisterFormData) => {
    const { confirm_password, is_agree, ...registerData } = data;
    dispatch(register({ body: registerData }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Đăng ký tài khoản thành công!",
        navigate: "/auth/verify-email",
      },
      error: {
        message: state.message,
      },
    },
  });

  const initialValues: IRegisterFormData = { full_name: "", email: "", password: "", confirm_password: "", is_agree: true };

  return (
    <>
      <div className="5 w-full space-y-5 px-4 md:max-w-xl">
        <div className="space-y-2">
          <h1 className="text-gray-900 flex items-center text-2xl font-bold md:text-4xl">Tạo tài khoản mới!</h1>
          <p className="text-sm text-gray-500 md:text-base">Tạo tài khoản để bắt đầu mua sắm các sản phẩm nổi bật của chúng tôi</p>
        </div>
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
              <Form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormInput
                  label="Tên của bạn"
                  type="text"
                  value={values.full_name}
                  isDisabled={state.status === EFetchStatus.PENDING}
                  error={(touched.full_name && errors.full_name) || ""}
                  name="full_name"
                  onChange={(value) => {
                    setFieldValue("full_name", value);
                  }}
                  onBlur={handleBlur}
                  placeholder="Nhập tên của bạn"
                />
                <FormInput
                  label="Email"
                  type="text"
                  value={values.email}
                  isDisabled={state.status === EFetchStatus.PENDING}
                  error={(touched.email && errors.email) || ""}
                  name="email"
                  onChange={(value) => {
                    setFieldValue("email", value);
                  }}
                  onBlur={handleBlur}
                  placeholder="Nhập email"
                />
                <FormInput
                  label="Mật Khẩu"
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
                <FormInput
                  label="Nhập lại mật khẩu"
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  isDisabled={state.status === EFetchStatus.PENDING}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    setFieldValue("confirm_password", value);
                  }}
                  error={(touched.confirm_password && errors.confirm_password) || ""}
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

                <Button
                  className="py-6"
                  variant="primary"
                  type="submit"
                  isLoading={state.status === EFetchStatus.PENDING}
                  isDisabled={state.status === EFetchStatus.PENDING}
                  text="Đăng ký"
                />
              </Form>
            );
          }}
        </Formik>
        <div className="flex items-center justify-center text-sm">
          <p>Bạn đã có tài khoản?</p>
          <Link className="ml-2 font-medium hover:underline" to={"/auth/login"}>
            Đăng nhập
          </Link>
        </div>
        <Divider variant="solid" className="my-1">
          Hoặc
        </Divider>
        <LoginGoogleButton />
      </div>
    </>
  );
};

export default RegisterForm;
