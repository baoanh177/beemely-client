import React from "react";
import Category from "./Category/Category";
import Price from "./Price/Price";
import { IProduct } from "@/services/store/product/product.model";

interface SidebarProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  products: IProduct[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleChange, products }) => {
  return (
    <div className="sidebar">
      <Category handleChange={handleChange} />
      <Price handleChange={handleChange} products={products} />
    </div>
  );
};

export default Sidebar;
