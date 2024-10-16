import clsx from "clsx";
import { HTMLProps } from "react";

const Title = ({ children, className }: HTMLProps<HTMLHeadingElement>) => {
  return <h2 className={clsx("text-4xl font-semibold", className)}>{children}</h2>;
};

export default Title;
