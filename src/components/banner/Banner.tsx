import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IBannerInitialState } from "@/services/store/banner/banner.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllBanners } from "@/services/store/banner/banner.thunk";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { state, dispatch } = useArchive<IBannerInitialState>("banner");

  useAsyncEffect(
    (async) => async(dispatch(getAllBanners({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );

  const length = state.banners.length;

  useEffect(() => {
    if (length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [length]);

  return (
    <section className="mx-auto max-w-[2520px] sm:px-1 md:px-4 xl:px-4">
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-[url('/src/assets/images/bg-banner.svg')] md:h-[500px] lg:h-[600px]">
        {state.banners.map((slide, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-cover bg-center p-8 md:flex-row">
              <div className="flex basis-1/2 flex-col justify-center px-4 md:pr-8">
                <div className="text-gray-900 flex flex-col text-3xl font-extrabold md:space-y-2 md:text-5xl lg:text-6xl">
                  <span>{slide.title}</span>
                </div>
                <div className="my-5 h-1 w-[50%] bg-dark-500"></div>
                <p className="line-clamp-3 text-sm font-light text-dark-90%">{slide.description}</p>
                <Link to={slide.path} className="w-full">
                  <button className="mt-6 w-full rounded-full bg-dark-500 px-6 py-2 text-white-500 hover:bg-dark-80% md:max-w-[50%]">
                    Mua ngay
                  </button>
                </Link>
              </div>
              <div className="relative hidden h-full w-full md:block md:basis-1/2 md:pl-8">
                <img src={slide.imageUrl} alt={slide.title} className="h-full w-full rounded-lg object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
