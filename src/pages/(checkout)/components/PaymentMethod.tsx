import { Form, Formik } from "formik";
import { object, string } from "yup";
import { Card, Radio } from "antd";
import { TPaymentMethod } from "@/services/store/checkout/checkout.model";
import { PAYMENT_METHODS } from "@/services/store/checkout/checkout.slice";
import { IoIosCheckmarkCircle } from "react-icons/io";
import clsx from "clsx";
import Button from "@/components/common/Button";

interface IPaymentMethodSelectorProps {
  value: TPaymentMethod;
  onChange: (value: TPaymentMethod) => void;
  next: () => void;
  prev: () => void;
}

const validationSchema = object().shape({
  paymentType: string().required("Vui lòng chọn phương thức thanh toán"),
});

const PaymentMethodSelector = ({ value, onChange, next, prev }: IPaymentMethodSelectorProps) => {
  const initialValues = {
    paymentType: value || "cod",
  };

  const handlePaymentChange = (newValue: TPaymentMethod) => {
    onChange(newValue);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        onChange(values.paymentType as TPaymentMethod);
        next();
      }}
    >
      {({ handleSubmit, setFieldValue, errors, touched }) => {
        return (
          <Form className="mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Chọn phương thức thanh toán</h2>
              <div className="grid w-full grid-cols-1 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.value}
                    className="relative h-full w-full"
                    onClick={() => {
                      setFieldValue("paymentType", method.value);
                      handlePaymentChange(method.value);
                    }}
                  >
                    <Card
                      className={clsx(
                        "h-full w-full cursor-pointer transition-all duration-200",
                        value === method.value ? "border-gray-90%" : "border-gray-50%",
                      )}
                    >
                      <div className="relative flex items-center gap-4">
                        <Radio
                          checked={value === method.value}
                          onChange={() => {
                            setFieldValue("paymentType", method.value);
                            handlePaymentChange(method.value);
                          }}
                          className="hidden"
                        />
                        <div className="flex h-12 w-16 items-center justify-center">
                          <img src={method.image} alt={method.label} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-800 font-medium">{method.label}</h3>
                        </div>
                      </div>
                      <div className={clsx("absolute right-3 top-3", value === method.value ? "block" : "hidden")}>
                        <IoIosCheckmarkCircle size={30} className="text-primary-90%" />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {errors.paymentType && touched.paymentType && <div className="mt-2 text-sm text-red-500">{errors.paymentType}</div>}
            </div>
            <div className="mt-6 flex justify-end gap-6">
              <Button text="Quay lại" onClick={prev} variant="ghost" className="min-w-[120px]" />
              <Button text="Tiếp tục" type="submit" variant="primary" className="min-w-[120px]" />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PaymentMethodSelector;
