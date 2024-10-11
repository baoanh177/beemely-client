import { useState, useEffect } from "react";
import { Button } from "antd";
import mylover from "@/assets/images/mylover.png";
import { FaArrowRight } from "react-icons/fa";

const bannerData = [
  {
    title: "Classic Exclusive",
    subtitle: "Women's Collection",
    discount: "UPTO 40% OFF",
    imageUrl: mylover,
  },
  {
    title: "Summer Sale",
    subtitle: "Men's Collection",
    discount: "UPTO 50% OFF",
    imageUrl: mylover,
  },
  {
    title: "New Arrivals",
    subtitle: "Kids Collection",
    discount: "UPTO 30% OFF",
    imageUrl: mylover,
  },
  {
    title: "Winter Special",
    subtitle: "Accessories",
    discount: "UPTO 20% OFF",
    imageUrl: mylover,
  },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-sm bg-gray-10% px-5 md:h-[500px] lg:h-[600px]">
      {bannerData.map((slide, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex h-full items-center justify-center px-4 md:flex-row md:justify-between md:px-16">
            <div className="z-10 w-full space-y-4 text-center md:w-1/2 md:space-y-6 md:text-left">
              <h3 className="text-gray-800 text-lg font-medium md:text-2xl">{slide.title}</h3>
              <h2 className="text-gray-900 text-3xl font-bold md:text-6xl">{slide.subtitle}</h2>
              <p className="text-gray-700 text-lg font-medium md:text-2xl">{slide.discount}</p>
              <Button type="default" className="h-auto bg-dark-500 px-4 py-2 text-sm text-white-500 md:px-6 md:py-2 md:text-lg">
                <span>Shop Now</span>
                <span className="ml-2">
                  <FaArrowRight />
                </span>
              </Button>
            </div>
            <div className="relative h-48 w-full md:h-full md:w-3/5">
              <img src={slide.imageUrl} alt="Banner" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
