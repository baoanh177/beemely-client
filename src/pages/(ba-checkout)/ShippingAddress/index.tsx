import Title from "@/components/common/Title";
import Steps from "@/components/Steps";
import { Container } from "@/styles/common-styles";
import { Button, Col, Row } from "antd";
import { FaHome } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import AddressCard from "./components/AddressCard";
import AddressForm from "./components/AddressForm";
import PriceCard from "../components/PriceCard";
import { AddressCardWrapper } from "./shipping-address.style";
import { Divide, SectionTitle } from "../checkout.style";

const ShippingAddress = () => {
  return (
    <>
      <Container>
        <Title text="Địa Chỉ Giao Hàng" className="mt-14" />
        <Row gutter={50} className="mb-20 mt-5">
          <Col span={16}>
            <Steps
              items={[
                {
                  title: "Địa chỉ",
                  icon: <FaHome />,
                  active: true,
                },
                {
                  title: "Thanh Toán",
                  icon: <FaWallet />,
                },
                {
                  title: "Xác Nhận",
                  icon: <IoIosPaper />,
                },
              ]}
            />
            <SectionTitle>Chọn địa chỉ nhận hàng</SectionTitle>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi suscipit repellat consequatur dicta pariatur rem quasi unde
              fugit nam optio! In earum unde iste qui nihil debitis explicabo sit odio!
            </p>
            <AddressCardWrapper>
              <AddressCard />
              <AddressCard />
            </AddressCardWrapper>
            <Button size="large" color="default" variant="solid" className="mt-7 h-[52px] px-24">
              Giao Hàng
            </Button>
            <Divide />
            <SectionTitle>Thêm địa chỉ</SectionTitle>
            <AddressForm />
          </Col>
          <Col span={8}>
            <PriceCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShippingAddress;
