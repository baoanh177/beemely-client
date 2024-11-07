import React from "react";
import { BsFillBagFill } from "react-icons/bs";

interface CardProps {
  img: string;
  title: string;
  star: React.ReactNode;
  reviews: number;
  prevPrice: number;
  newPrice: number;
}

const Card: React.FC<CardProps> = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <section className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <section className="card-reviews">
          {star} {star} {star} {star}
          <span className="total-reviews">{reviews}</span>
        </section>
        <section className="card-price">
          <div className="price">
            <del>{prevPrice}</del> {newPrice}
          </div>
          <div className="bag">
            <BsFillBagFill className="bag-icon" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Card;
