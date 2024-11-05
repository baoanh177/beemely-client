import { Radio, Space } from "antd";
import React, { useEffect } from "react";
import Input from "../../components/Input";
import type { RadioChangeEvent } from "antd";
import { useArchive } from "@/hooks/useArchive";
import { getAllProductTypes } from "@/services/store/product-type/product-type.thunk";
import { IProductTypeInitialState } from "@/services/store/product-type/product-type.slice";

interface CategoryProps {
  handleChange: (event: RadioChangeEvent) => void;
  isExpanded: boolean;
}

const Category: React.FC<CategoryProps> = ({ handleChange, isExpanded }) => {
  const { state, dispatch } = useArchive<IProductTypeInitialState>("productTypes");
  const { productTypes } = state;

  useEffect(() => {
    dispatch(getAllProductTypes());
  }, [dispatch]);

  return (
    <div
      className={`bg-white rounded-lg p-4 pt-0 shadow-sm transition-all duration-300 ${
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <Radio.Group onChange={handleChange} className="w-full" defaultValue="">
        <Space direction="vertical" className="w-full">
          <Radio value="" className="hover:bg-gray-50 mb-2 flex items-center rounded-md p-2 transition-colors">
            <span className="text-gray-700 text-sm">Tất cả sản phẩm</span>
          </Radio>

          {productTypes.map((productType) => (
            <Input key={productType.id} handleChange={handleChange} value={productType.id} title={productType.name} name="category" color="" />
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Category;
