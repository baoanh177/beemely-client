import React from "react";
import { Row, Col } from "antd";

interface ContainerProps {
  children: React.ReactNode;
}

// ** Container common
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Row justify="center" className="w-full">
      <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14} className="px-4">
        {children}
      </Col>
    </Row>
  );
};

export default Container;
