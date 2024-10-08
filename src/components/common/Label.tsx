import clsx from "clsx";

interface ILabelProps {
  text?: string;
  htmlFor?: string;
  className?: string;
  isRequired?: boolean;
}

const Label = ({ text, htmlFor, className, isRequired = false }: ILabelProps) => {
  if (!text) return;
  return (
    <label className={clsx("text-m-medium text-black-300 flex gap-1", className)} htmlFor={htmlFor}>
      <span>{text}</span>
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
