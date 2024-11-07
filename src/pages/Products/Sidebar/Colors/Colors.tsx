import { Radio, Space } from "antd";
import React, { useEffect } from "react";
import type { RadioChangeEvent } from "antd";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { getAllColor } from "@/services/store/color/color.thunk";

interface ColorProps {
  handleChange: (event: RadioChangeEvent) => void;
  isExpanded: boolean;
}

const Colors: React.FC<ColorProps> = ({ handleChange, isExpanded }) => {
  const { state, dispatch } = useArchive<IColorInitialState>("colors");
  const { colors } = state;

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);

  return (
    <div
      className={`bg-white rounded-lg p-4 pt-0 shadow-sm transition-all duration-300 ${
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <Radio.Group onChange={handleChange} className="w-full" defaultValue="">
        <Space direction="vertical" className="w-full">
          <Radio value="" className="hover:bg-gray-50 flex w-full items-center rounded-md p-2 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm">Tất cả sản phẩm</span>
            </div>
          </Radio>

          {colors.map((color) => (
            <Radio
              key={color.id}
              value={color.id}
              className="hover:bg-gray-50 flex w-full items-center rounded-md p-2 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: color.value,
                    border: color.value.toLowerCase() === "#ffffff" ? "2px solid #e5e7eb" : "none",
                  }}
                />
                <span className="text-gray-700 text-sm">{color.name}</span>
              </div>
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      {colors.length === 0 && <p className="mt-2 text-sm italic text-gray-500">No colors available</p>}
    </div>
  );
};

export default Colors;
