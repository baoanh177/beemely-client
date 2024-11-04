import React from "react";
import Input from "../../components/Input";

interface CategoryProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category: React.FC<CategoryProps> = ({ handleChange }) => {
  return (
    <div>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test" />
        <span className="checkmark"></span>All
      </label>
      <Input handleChange={handleChange} value="sneakers" title="Sneakers" name="test" color="#000" />
      <Input handleChange={handleChange} value="flats" title="Flats" name="test" color="#000" />
      <Input handleChange={handleChange} value="sandals" title="Sandals" name="test" color="#000" />
      <Input handleChange={handleChange} value="heels" title="Heels" name="test" color="#000" />
    </div>
  );
};

export default Category;
