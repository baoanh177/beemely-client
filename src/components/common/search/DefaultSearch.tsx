import React from "react";
import FilterTableStatus, { IFilterTableStatusProps } from "../FilterTableStatus";

export interface IDefaultSearchProps {
  filterOptions?: IFilterTableStatusProps;
}

export const DefaultSearch: React.FC<IDefaultSearchProps> = ({ filterOptions }) => {
  return <div className="flex w-full">{filterOptions && <FilterTableStatus {...filterOptions} />}</div>;
};
