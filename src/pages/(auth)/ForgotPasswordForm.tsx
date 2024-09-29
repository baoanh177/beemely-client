import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { Formik } from "formik";
import { object, string } from "yup";
import { forgotPassword } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { MdOutlineEmail } from "react-icons/md";
import FormInput from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import Button from "@/components/common/Button";

interface IForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const handleLogin = (data: IForgotPasswordFormData) => {
    dispatch(forgotPassword({ body: data }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Kiểm tra hộp thư của bạn để đặt lại mật khẩu.",
      },
      error: {
        message: state.message,
      },
    },
  });

  const initialValues: IForgotPasswordFormData = { email: "" };

  const validateSchema = object().shape({
    email: string().email("Email không hợp lệ!").required("Vui lòng nhập email!"),
  });

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-5 p-4 md:p-8">
        <div className="flex flex-col space-y-2">
          <h1 className="flex items-center text-4xl font-bold text-gray-900">Quên mật khẩu</h1>
          <p className="text-gray-500">Nhập địa chỉ email đã đăng ký của bạn. Chúng tôi sẽ gửi cho bạn một mã để đặt lại mật khẩu của bạn.</p>
        </div>
        {state.status === EFetchStatus.REJECTED && state.message && <FormError message={state.message} />}
        <Formik
          validationSchema={validateSchema}
          initialValues={initialValues}
          validateOnBlur
          onSubmit={(data) => {
            handleLogin(data);
          }}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
            return (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormInput
                  icon={MdOutlineEmail}
                  label="Nhập địa chỉ email"
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
                <Button className="py-6" variant="primary" type="submit" isDisabled={state.status === EFetchStatus.PENDING} text="Gửi email" />
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
