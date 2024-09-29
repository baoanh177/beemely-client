import { ReactNode } from "react";
import clsx from "clsx";

export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost" | "secondary";
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  size?: "full";
  onClick?: () => void;
  className?: string;
}

const Button = ({ variant = "primary", text, type, isDisabled = false, isLoading = false, icon, size, className, onClick }: IButtonProps) => {
  const variantClass = {
    primary: "bg-slate-800 text-white",
    ghost: "text-slate-800 bg-slate-50",
    secondary: "text-gray-400 border border-gray-400",
  };

  const variantLoading = {
    primary: "border-white border-t-slate-800",
    ghost: "border-slate-800 border-t-slate-50",
    secondary: "border-gray-400 border-t-white",
  };

  return (
    <button
      onClick={() => {
        if (onClick && !isDisabled && !isLoading) onClick();
      }}
      type={type}
      className={clsx(
        "text-m-semibold flex shrink-0 items-center justify-center gap-1 rounded-[8px] px-[14px] py-[10px] transition-opacity",
        variantClass[variant],
        className,
        {
          "cursor-not-allowed opacity-65": isDisabled,
          "opacity-65": isLoading,
          "cursor-pointer hover:opacity-95": !isDisabled && !isLoading,
        },
        size === "full" && "w-full",
      )}
    >
      {isLoading ? <div className={clsx(`${variantLoading[variant]} h-4 w-4 animate-spin rounded-full border-2`)} /> : icon}
      {text}
    </button>
  );
};

export default Button;
