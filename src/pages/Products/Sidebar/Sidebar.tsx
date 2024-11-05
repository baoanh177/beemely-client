import React, { useState } from "react";
import Size from "./Size/Size";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import Category from "./Category/Category";
import Title from "antd/es/typography/Title";
import type { RadioChangeEvent } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { IProduct } from "@/services/store/product/product.model";
import { ChevronDownIcon, ChevronUpIcon, PaintbrushIcon, ShoppingBasket, Diameter } from "lucide-react";

interface SidebarProps {
  handleChange: (event: RadioChangeEvent) => void;
  products: IProduct[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleChange }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("category");

  const toggleExpand = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="sidebar">
      <div className="bg-gray-100 flex cursor-pointer items-center justify-between p-4 pb-0" onClick={() => toggleExpand("category")}>
        <div className="mb-4 flex items-center gap-2">
          <ShoppingBasket className="text-lg text-blue-500" />
          <Title level={5} className="text-gray-800 m-0">
            Thể loại giày
          </Title>
        </div>
        {expandedSection === "category" ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <Category handleChange={handleChange} isExpanded={expandedSection === "category"} />

      <div className="bg-gray-100 flex cursor-pointer items-center justify-between p-4 pb-0" onClick={() => toggleExpand("price")}>
        <div className="mb-4 flex items-center gap-2">
          <DollarOutlined className="text-lg text-blue-500" />
          <Title level={5} className="text-gray-800 m-0">
            Khoảng giá
          </Title>
        </div>
        {expandedSection === "price" ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <Price handleChange={handleChange} isExpanded={expandedSection === "price"} />

      <div className="bg-gray-100 flex cursor-pointer items-center justify-between p-4 pb-0" onClick={() => toggleExpand("colors")}>
        <div className="mb-4 flex items-center gap-2">
          <PaintbrushIcon className="h-5 w-5 text-blue-500" />
          <Title level={5} className="text-gray-800 m-0">
            Màu sắc
          </Title>
        </div>

        {expandedSection === "colors" ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <Colors handleChange={handleChange} isExpanded={expandedSection === "colors"} />

      <div className="bg-gray-100 flex cursor-pointer items-center justify-between rounded-b-lg p-4 pb-0" onClick={() => toggleExpand("size")}>
        <div className="mb-4 flex items-center gap-2">
          <Diameter className="h-5 w-5 text-blue-500" />
          <Title level={5} className="text-gray-800 m-0">
            Kích cỡ
          </Title>
        </div>
        {expandedSection === "size" ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <Size handleChange={handleChange} isExpanded={expandedSection === "size"} />
    </div>
  );
};

export default Sidebar;
