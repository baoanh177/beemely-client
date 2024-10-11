import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { forgotPassword } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/common/Button";
import { useAppModal } from "@/hooks/useAppModal";

import { IoCheckmarkCircle } from "react-icons/io5";
import NofificationModal from "@/components/modal/NofificationModal";
import { useEffect } from "react";

interface IForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const { isOpen, onClose, onOpen } = useAppModal();

  const handleLogin = (data: IForgotPasswordFormData) => {
    dispatch(forgotPassword({ body: data }));
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

  const initialValues: IForgotPasswordFormData = { email: "" };

  const validateSchema = object().shape({
    email: string().email("Email không hợp lệ!").required("Vui lòng nhập email!"),
  });

  useEffect(() => {
    if (isOpen) onClose();
  }, []);

  return (
    <>
      {isOpen && (
        <NofificationModal
          icon={IoCheckmarkCircle}
          title="Yêu cầu đặt lại mật khẩu đã được gửi"
          subTitle="Vui lòng kiểm tra email để đặt lại mật khẩu"
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <div className="w-full px-4 md:max-w-xl">
        <div className="flex flex-col space-y-2">
          <h1 className="text-gray-900 flex items-center text-4xl font-bold">Quên mật khẩu</h1>
          <p className="text-gray-500">
            Nhập địa chỉ email đã đăng ký của bạn. Chúng tôi sẽ gửi 1 đường dẫn để bạn có thể thay đổi mật khẩu của mình
          </p>
        </div>
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
              <Form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormInput
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
                <Button
                  className="py-6"
                  variant="primary"
                  type="submit"
                  isDisabled={state.status === EFetchStatus.PENDING}
                  isLoading={state.status === EFetchStatus.PENDING}
                  text="Gửi email"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
