import { Formik, Form, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { resetPassword } from "@/services/store/auth/auth.thunk";
import FormInput from "@/components/form/FormInput";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { useParams } from "react-router-dom";
import Button from "@/components/common/Button";

interface IResetPasswordFormFormData {
  password: string;
  confirm_password: string;
}

const validateSchema = object().shape({
  password: string().required("Vui lòng nhập mật khẩu mới"),
  confirm_password: string()
    .oneOf([ref("password"), undefined], "Mật khẩu nhập lại không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

const ResetPasswordForm = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const { token } = useParams();
  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Your password has been change!",
        navigate: "/auth/login",
      },
      error: {
        message: state.message,
      },
    },
  });

  const initialValues: IResetPasswordFormFormData = { password: "", confirm_password: "" };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-5 p-4 md:p-8">
        <div className="flex flex-col space-y-2">
          <h1 className="flex items-center text-4xl font-bold text-gray-900">Đặt lại mật khẩu</h1>
          <p className="text-gray-500">Đặt lại mật khẩu và tiến hành đăng nhập!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (validateSchema.isValidSync(values)) {
              const { confirm_password, ...data } = values;
              dispatch(resetPassword({ body: data, token: token as string }));
              setSubmitting(false);
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleBlur, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <FormInput
                label="Mật khẩu mới"
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
              <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
              <Button
                className="py-6"
                variant="primary"
                type="submit"
                isDisabled={state.status === EFetchStatus.PENDING}
                text="Đặt lại mật khẩu"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
