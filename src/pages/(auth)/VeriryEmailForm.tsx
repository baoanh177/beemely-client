import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { verifyEmail } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import clsx from "clsx";
import Button from "@/components/common/Button";
import { useConfirmModal } from "@/hooks/useConfirmModal";

interface IVerifyEmailFormFormData {
  code: string[];
}

const VerifyEmailForm: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  const { onClose } = useConfirmModal();

  const handleVerify = (data: IVerifyEmailFormFormData) => {
    dispatch(verifyEmail({ body: { code: data.code.join("") } }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Email đã được xác thực thành công, tiến hành đăng nhập",
        navigate: "/auth/login",
        onFinish: onClose,
      },
      error: {
        message: state.message,
      },
    },
  });

  const initialValues: IVerifyEmailFormFormData = { code: Array(6).fill("") };

  const validationSchema = Yup.object().shape({
    code: Yup.array()
      .of(Yup.string())
      .test("is-completed", "Vui lòng nhập đủ 6 chữ số", (value) => value?.every((digit) => /^\d$/.test(digit || ""))),
  });

  const handleChange = (index: number, value: string, setFieldValue: (field: string, value: any) => void) => {
    if (/^\d*$/.test(value)) {
      setFieldValue(`code[${index}]`, value);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0 && !event.currentTarget.value) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const pastedArray = pastedData.split("");

    pastedArray.forEach((digit, index) => {
      setFieldValue(`code[${index}]`, digit);
    });

    const nextEmptyIndex = pastedArray.length < 6 ? pastedArray.length : 5;
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col space-y-2">
        <h1 className="flex items-center text-4xl font-bold text-gray-900">Nhập mã xác thực</h1>
        <p className="text-gray-500">Mã xác thực 6 số đã được gửi đến email của bạn, vui lòng kiểm tra cả trong thư mục rác.</p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <p className="text-gray-500">{state?.profile?.email}</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (validationSchema.isValidSync(values)) {
              handleVerify(values);
            }
          }}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex justify-between">
                {values.code.map((digit, index) => (
                  <Field
                    key={index}
                    name={`code[${index}]`}
                    type="text"
                    maxLength={1}
                    innerRef={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value, setFieldValue)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e, setFieldValue)}
                    className={clsx(
                      "h-12 w-12 rounded-lg border-2 border-gray-300 text-center text-2xl font-semibold focus:border-green-500 focus:outline-none",
                      !!digit && "border-gray-900",
                    )}
                  />
                ))}
              </div>
              {errors.code && <span className="text-sm text-red-500">{errors.code}</span>}
              <Button
                className="mt-6 py-4"
                variant="primary"
                type="submit"
                isDisabled={state.status === EFetchStatus.PENDING}
                text=" Xác thực"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
