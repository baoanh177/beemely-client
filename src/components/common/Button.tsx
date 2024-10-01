import { ReactNode } from "react";
import clsx from "clsx";

export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost" | "secondary" | "default";
  text?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  shape?: "rounded" | "rectangle";
  size?: "full";
  onClick?: () => void;
  className?: string;
}

const Button = ({ variant = "primary", type = "button", text, isDisabled = false, shape = "rectangle", isLoading = false, icon, size, className, onClick }: IButtonProps) => {
  const typeClass = {
    primary: "bg-primary-500 text-white-500",
    secondary: "text-primary-500 bg-gray-10%",
    ghost: "border border-primary-500 text-primary-500",
    default: "text-primary-500 bg-white-500",
  };

  const typeLoading = {
    primary: "border-white-500 border-t-primary-500",
    ghost: "border-primary-500 border-t-white-500",
    secondary: "border-gray-400 border-t-white-500",
    default: "border-primary-500 border-t-white-500",
  };

  return (
    <button
      type={type}
      onClick={() => {
        if (onClick && !isDisabled && !isLoading) onClick();
      }}
      className={clsx(
        "text-m-semibold flex shrink-0 items-center justify-center gap-1 rounded-[8px] transition-opacity",
        typeClass[variant],
        className,
        {
          "h-[40px] w-[40px] shrink-0 rounded-full p-2": shape === "rounded",
          "px-[14px] py-[10px]": shape === "rectangle",
        },
        {
          "cursor-not-allowed opacity-65": isDisabled,
          "opacity-65": isLoading,
          "cursor-pointer hover:opacity-95": !isDisabled && !isLoading,
        },
        size === "full" && "w-full",
      )}
    >
      {isLoading ? <div className={clsx(`${typeLoading[variant]} h-4 w-4 animate-spin rounded-full border-2`)} /> : icon}
      {text}
    </button>
  );
};

export default Button;
