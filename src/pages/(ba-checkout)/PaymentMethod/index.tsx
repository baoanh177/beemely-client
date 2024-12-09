import Title from "@/components/common/Title";
import Steps from "@/components/Steps";
import { Container } from "@/styles/common-styles";
import { Col, Radio, Row } from "antd";
import { FaHome, FaWallet } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import PriceCard from "../components/PriceCard";
import { Divide, SectionTitle } from "../checkout.style";

const PaymentMethod = () => {
  return (
    <>
      <Container>
        <Title text="Phương Thức Thanh Toán" />
        <Row gutter={50} className="mb-20 mt-5">
          <Col span={16}>
            <Steps
              items={[
                {
                  title: "Địa chỉ",
                  icon: <FaHome />,
                },
                {
                  title: "Thanh Toán",
                  icon: <FaWallet />,
                  active: true,
                },
                {
                  title: "Xác Nhận",
                  icon: <IoIosPaper />,
                },
              ]}
            />
            <SectionTitle>Chọn phương thức thanh toán</SectionTitle>
            <div className="mt-6 flex flex-col">
              <Radio name="payment-method" className="text-xl font-bold">
                Tiền Mặt
              </Radio>
              <Divide />
              <Radio name="payment-method" className="text-xl font-bold">
                Paypal
              </Radio>
              <Divide />
              <Radio name="payment-method" className="text-xl font-bold">
                Credit Card
              </Radio>
            </div>
          </Col>
          <Col span={8}>
            <PriceCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentMethod;
