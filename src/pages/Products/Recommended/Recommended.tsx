import React from "react";
import Button from "../components/Button";

interface RecommendedProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ handleClick }) => {
  return (
    <div>
      <h2 className="recommended-title">Recommended</h2>
      <div className="recommended-flex">
        <Button onClickHandler={handleClick} value="" title="All Products" />
        <Button onClickHandler={handleClick} value="Nike" title="Nike" />
        <Button onClickHandler={handleClick} value="Adidas" title="Adidas" />
        <Button onClickHandler={handleClick} value="Puma" title="Puma" />
        <Button onClickHandler={handleClick} value="Vans" title="Vans" />
      </div>
    </div>
  );
};

export default Recommended;
