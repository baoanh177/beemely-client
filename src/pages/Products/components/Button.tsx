import React from "react";

interface ButtonProps {
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onClickHandler, value, title }) => {
  return (
    <button onClick={onClickHandler} value={value} className="btns">
      {title}
    </button>
  );
};

export default Button;
