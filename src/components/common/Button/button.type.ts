import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonType extends DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  icon?: ReactNode
}