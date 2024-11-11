import { useState, useEffect } from "react";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { useArchive } from "@/hooks/useArchive";
import { IBannerInitialState } from "@/services/store/banner/banner.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllBanners } from "@/services/store/banner/banner.thunk";
import { Link } from "react-router-dom";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { state, dispatch } = useArchive<IBannerInitialState>("banner");
  const {} = useAsyncEffect(
    (async) => async(dispatch(getAllBanners({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );
  const length = state.banners.length || 0;

  useEffect(() => {
    if (length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [length]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-sm bg-gray-10% md:h-[500px] lg:h-[600px]">
      {state.banners.map((slide, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full">
            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center px-4 md:bottom-12 md:items-start md:px-12 lg:bottom-16 lg:px-16">
              <Button
                type="default"
                className="group flex items-center space-x-2 rounded-md bg-dark-500 px-10 py-8 text-base font-medium text-tertiary-5% transition-all hover:bg-gray-500 md:text-lg"
              >
                <Link to={slide.path} className="flex items-center">
                  <span>Mua ngay</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="block h-full">
              <img src={slide.imageUrl} alt="Banner" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
