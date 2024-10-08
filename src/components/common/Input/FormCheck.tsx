import { useState } from "react";
import { Checkbox, ConfigProvider, Radio } from "antd";
import clsx from "clsx";

export interface FormCheckProps {
  type?: "checkbox" | "radio";
  label?: string;
  onChange?: (isChecked: boolean) => void;
  isDefaultChecked?: boolean;
  isDisable?: boolean;
  value?: string;
  name?: string;
}

const FormCheck = ({ type = "checkbox", label, onChange, value, isDefaultChecked, name, isDisable }: FormCheckProps) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(isDefaultChecked);

  const handleChange = (checked: boolean) => {
    if (!isDisable) {
      setIsChecked(checked);
      if (onChange) {
        onChange(checked);
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#131118",
          colorTextDisabled: "#fff",
          colorBgContainerDisabled: "#fff",
          colorBorder: "#131118",
        },
      }}
    >
      <div className={clsx("flex items-center gap-2", isDisable && "opacity-50")}>
        {type === "checkbox" ? (
          <Checkbox
            name={name}
            checked={isChecked}
            value={value}
            disabled={isDisable}
            onChange={(e) => handleChange(e.target.checked)}
            className="rounded-md"
          />
        ) : (
          <Radio name={name} checked={isChecked} value={value} disabled={isDisable} onChange={(e) => handleChange(e.target.checked)} />
        )}
        {label && <label className="text-m text-primary-500">{label}</label>}
      </div>
    </ConfigProvider>
  );
};

export default FormCheck;
