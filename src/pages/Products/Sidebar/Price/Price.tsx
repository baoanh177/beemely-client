import React from "react";
import Input from "../../components/Input";
import { IProduct } from "@/services/store/product/product.model";

interface PriceProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  products: IProduct[];
}

const Price: React.FC<PriceProps> = ({ handleChange, products }) => {
  const prices = products.flatMap((product) => product.maxPrice);

  const priceOptions = prices.map((price, index) => {
    if (price === undefined) return null;
    return <Input key={index} handleChange={handleChange} value={price} title={price.toString()} name="price" color="green" />;
  });

  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Price</h2>

      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="price" />
        <span className="checkmark"></span>All
      </label>

      {priceOptions}
    </div>
  );
};

export default Price;
