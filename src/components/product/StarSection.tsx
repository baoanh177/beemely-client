import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarSectionProps {
  totalReviews: number;
  averageRating: number;
}

const StarSection: React.FC<StarSectionProps> = ({ totalReviews, averageRating }) => {
  const renderStar = (index: number) => {
    if (averageRating >= index + 1) {
      return <FaStar key={index} className="h-4 w-4 fill-primary-500 text-primary-500" />;
    } else if (averageRating > index && averageRating < index + 1) {
      return <FaStarHalfAlt key={index} className="h-4 w-4 fill-primary-500 text-primary-500" />;
    } else {
      return <FaRegStar key={index} className="h-4 w-4 text-primary-500" />;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{[...Array(5)].map((_, index) => renderStar(index))}</div>
      <div className="ml-2 text-sm text-primary-400">
        {averageRating.toFixed(1)} ({totalReviews} đánh giá)
      </div>
    </div>
  );
};

export default StarSection;
