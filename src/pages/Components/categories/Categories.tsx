import React, { useRef } from "react";
import Slider from "react-slick";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

import CategoryCard from "@/components/common/CategoryCard";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categoriesData = [
  {
    name: "Ethnic Wear",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Western Wear",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Formal Wear",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Casual Wear",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sports Wear",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const Categories: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <Title text="Shop by Category" />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            shape="rectangle"
            icon={<IoMdArrowBack className="h-6 w-6" />}
            onClick={handlePrev}
            aria-label="Previous slide"
          />
          <Button
            variant="primary"
            shape="rectangle"
            icon={<IoMdArrowForward className="h-6 w-6" />}
            onClick={handleNext}
            aria-label="Next slide"
          />
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {categoriesData.map((category, index) => (
          <div key={index} className="px-2">
            <CategoryCard background={category.imageUrl} name={category.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
