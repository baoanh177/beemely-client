import React, { useEffect } from "react";
import Input from "../../components/Input";
import { useArchive } from "@/hooks/useArchive";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { getAllSize } from "@/services/store/size/size.thunk";
import { Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

interface SizeProps {
  handleChange: (event: RadioChangeEvent) => void;
  isExpanded: boolean;
}

const Size: React.FC<SizeProps> = ({ handleChange, isExpanded }) => {
  const { state, dispatch } = useArchive<ISizeInitialState>("sizes");
  const { sizes } = state;

  useEffect(() => {
    dispatch(getAllSize());
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

          {sizes.map((size) => (
            <Input key={size.id} handleChange={handleChange} value={size.name} title={size.name} name="size" color="" />
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Size;
