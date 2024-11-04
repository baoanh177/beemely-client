import { ReactNode } from "react";

export interface IStepItem {
  icon?: ReactNode;
  active?: boolean;
  title: string;
  onClick?: () => void;
}

export interface IProps {
  items: IStepItem[];
}
