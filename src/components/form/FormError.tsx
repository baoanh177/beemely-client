import clsx from "clsx";
import { IoWarningOutline } from "react-icons/io5";

interface FormErrorProps {
  message: string;
  className?: string;
}

const FormError = ({ message, className }: FormErrorProps) => {
  return (
    <div className={clsx("rounded-sm bg-red-50 px-2 py-3", className)}>
      <IoWarningOutline className="h-5 w-5" />
      {message}
    </div>
  );
};

export default FormError;
