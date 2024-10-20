import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarSectionProps {
  count: number;
  rating: number;
}

const StarSection: React.FC<StarSectionProps> = ({ count, rating }) => {
  const renderStar = (index: number) => {
    if (rating >= index + 1) {
      return <FaStar key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
    } else if (rating > index && rating < index + 1) {
      return <FaStarHalfAlt key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
    } else {
      return <FaRegStar key={index} className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{[...Array(5)].map((_, index) => renderStar(index))}</div>
      <div className="ml-2 text-sm text-gray-90%">
        {rating.toFixed(1)} ({count} đánh giá)
      </div>
    </div>
  );
};

export default StarSection;
