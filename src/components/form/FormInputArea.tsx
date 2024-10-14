import React from "react";
import { Input } from "antd";
import clsx from "clsx";
const { TextArea } = Input;

interface FormInputAreaProps {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  isReadonly?: boolean;
  onChange?: (value: string) => void;
  error?: string;
}
const FormInputArea: React.FC<FormInputAreaProps> = ({ label, placeholder, name, value, isReadonly, defaultValue, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      onChange(inputValue);
    }
  };
  return (
    <div>
      {label && <label className="text-m-medium text-black-300 mb-1">{label}</label>}
      <TextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={isReadonly}
        defaultValue={defaultValue}
        rows={5}
        className={clsx("text-m-regular custom-textarea bg-gray-25 min-h-[500px] px-2 py-3", { readonly: isReadonly })}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default FormInputArea;
