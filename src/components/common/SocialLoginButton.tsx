import clsx from "clsx";
import { IconType } from "react-icons";

export interface ISocialLoginButtonProps {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: IconType;
  size?: "full";
  onClick?: () => void;
  className?: string;
}

const SocialLoginButton = ({ text, isDisabled = false, isLoading = false, icon, size, className, onClick }: ISocialLoginButtonProps) => {
  const Icon = icon ? icon : null;
  return (
    <button
      onClick={onClick && !isDisabled && !isLoading ? onClick : undefined}
      className={clsx(
        "text-m-semibold flex shrink-0 items-center justify-center gap-1 rounded-[8px] bg-slate-100 px-[14px] py-[10px] transition-opacity hover:bg-slate-100/80",
        className,
        {
          "cursor-not-allowed opacity-65": isDisabled,
          "opacity-65": isLoading,
          "cursor-pointer hover:opacity-95": !isDisabled && !isLoading,
        },
        size === "full" && "w-full",
      )}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {text}
    </button>
  );
};

export default SocialLoginButton;
