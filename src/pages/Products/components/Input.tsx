import React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface InputProps {
  handleChange: (event: RadioChangeEvent) => void;
  value: string | number;
  title: string;
  name: string;
  color?: string;
}

const Input: React.FC<InputProps> = ({ handleChange, value, title, color }) => {
  return (
    <Radio onChange={handleChange} value={value} className="hover:bg-gray-50 mb-2 flex items-center rounded-md p-2 transition-colors">
      <div className="flex items-center gap-2">
        {color && <span className="border-gray-200 inline-block h-4 w-4 rounded-full border" style={{ backgroundColor: color }} />}
        <span className="text-gray-700 text-sm">{title}</span>
      </div>
    </Radio>
  );
};

export default Input;
