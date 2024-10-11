import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { verifyEmail } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import clsx from "clsx";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";

interface IVerifyEmailFormFormData {
  code: string[];
}

const VerifyEmailForm: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const handleVerify = (data: IVerifyEmailFormFormData) => {
    dispatch(verifyEmail({ body: { code: data.code.join("") } }));
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Email đã được xác thực thành công",
        navigate: "/auth/login",
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
    }
  };

  return (
    <div className="w-full space-y-6 px-4 md:max-w-xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-gray-900 flex items-center text-2xl font-bold md:text-4xl">Nhập mã xác thực</h1>
        <p className="text-sm text-gray-500 md:text-base">
          Mã xác thực 6 số đã được gửi đến email của bạn, vui lòng kiểm tra cả trong thư mục rác.
        </p>
      </div>
      <div className="space-y-3">
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
                  <input
                    key={index}
                    name={`code[${index}]`}
                    type="text"
                    maxLength={1}
                    ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value, setFieldValue)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    className={clsx(
                      "h-12 w-12 rounded-md border-2 border-gray-80% text-center text-xl font-semibold focus:border-green-600 focus:outline-none md:h-16 md:w-16 md:text-2xl",
                      !!digit && "border-primary-90%",
                    )}
                  />
                ))}
              </div>
              {errors.code && <span className="text-sm text-red-500">{errors.code}</span>}
              <Button
                className="py-[10px]"
                variant="primary"
                type="submit"
                isLoading={state.status === EFetchStatus.PENDING}
                isDisabled={state.status === EFetchStatus.PENDING}
                text=" Xác thực"
              />
            </Form>
          )}
        </Formik>
        <div className="flex justify-center">
          <Link className="inline-block text-center text-sm hover:underline" to={"/auth/login"}>
            Không phải bây giờ!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
