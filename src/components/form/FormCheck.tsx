import { Checkbox, ConfigProvider, Radio } from "antd";
import clsx from "clsx";

export interface FormCheckProps {
  type?: "checkbox" | "radio";
  label?: string;
  onChange?: (isDefaultChecked: boolean) => void;
  isDefaultChecked?: boolean;
  isDisable?: boolean;
  checked?: boolean;
  value?: string;
  name?: string;
  id?: string;
  error?: string;
}
false;
const FormCheck = ({
  type = "checkbox",
  id = "form-check",
  label,
  onChange,
  checked,
  value,
  isDefaultChecked,
  name,
  isDisable,
  error,
}: FormCheckProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1e293b",
          colorTextDisabled: "#fff",
          colorBgContainerDisabled: "#fff",
        },
      }}
    >
      <div className={clsx("flex items-center gap-1", isDisable && "opacity-65")}>
        {type === "checkbox" ? (
          <Checkbox
            id={id}
            name={name}
            defaultChecked={isDefaultChecked}
            checked={checked}
            value={value}
            disabled={isDisable}
            onChange={(e) => {
              if (!isDisable && onChange) onChange(e.target.checked);
            }}
            className="rounded-md"
          />
        ) : (
          <Radio
            id={id}
            name={name}
            checked={checked}
            value={value}
            defaultChecked={isDefaultChecked}
            disabled={isDisable}
            onChange={(e) => {
              if (!isDisable && onChange) onChange(e.target.checked);
            }}
          />
        )}
        {label && (
          <label htmlFor={id} className="black-300 cursor-pointer text-sm">
            {label}
          </label>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </ConfigProvider>
  );
};

export default FormCheck;
