import React from "react";
import { Card, Steps } from "antd";
import { useArchive } from "@/hooks/useArchive";
import { ICheckoutState, IShippingAddress, TPaymentMethod } from "@/services/store/checkout/checkout.model";
import { setCurrentStep, setPaymentMethod, setShippingAddress } from "@/services/store/checkout/checkout.slice";
import { Container } from "@/styles/common-styles";
import { GoHome, GoCreditCard } from "react-icons/go";
import Button from "@/components/common/Button";
import { CgNotes } from "react-icons/cg";
import tw from "twin.macro";
import ShippingForm from "../components/ShippingForm";
import PaymentMethodSelector from "../components/PaymentMethod";
import { OrderConfirmation } from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSumary";

const { Step } = Steps;

const StepLabel = tw.h3`items-center text-sm font-semibold ml-3 text-nowrap`;

const CheckoutPage: React.FC = () => {
  const { state: checkoutData, dispatch } = useArchive<ICheckoutState>("checkout");
  const { currentStep } = checkoutData;

  const next = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const prev = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleShippingSubmit = (values: IShippingAddress) => {
    dispatch(setShippingAddress(values));
  };

  const handlePaymentMethodSelect = (value: TPaymentMethod) => {
    dispatch(setPaymentMethod(value));
  };

  const steps = [
    {
      title: <StepLabel>Địa chỉ giao hàng</StepLabel>,
      icon: <Button onClick={() => dispatch(setCurrentStep(0))} icon={<GoHome size={18} />} shape="rectangle" variant={"primary"} />,
      content: <ShippingForm initialValues={checkoutData.shippingAddress} onSubmit={handleShippingSubmit} next={next} />,
    },
    {
      title: <StepLabel>Thanh toán</StepLabel>,
      icon: <Button icon={<GoCreditCard size={18} />} shape="rectangle" variant={currentStep >= 1 ? "primary" : "secondary"} />,
      content: <PaymentMethodSelector next={next} prev={prev} value={checkoutData.paymentType} onChange={handlePaymentMethodSelect} />,
    },
    {
      title: <StepLabel>Xác nhận</StepLabel>,
      icon: <Button icon={<CgNotes size={18} />} shape="rectangle" variant={currentStep === 2 ? "primary" : "secondary"} />,
      content: <OrderConfirmation />,
    },
  ];

  return (
    <Container className="py-20">
      <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Steps current={currentStep} labelPlacement="vertical" status="wait">
            {steps.map((item, index) => (
              <Step key={index} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          <Card className="mt-8 px-4 py-6 shadow-lg">{steps[currentStep].content}</Card>
        </div>
        <div className="col-span-full md:col-span-2">
          <OrderSummary />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
