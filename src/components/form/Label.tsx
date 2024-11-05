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
    <label className={clsx("text-black flex gap-1 font-medium", className)} htmlFor={htmlFor}>
      <span className="text-[14px] font-[400]">{text}</span>
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
