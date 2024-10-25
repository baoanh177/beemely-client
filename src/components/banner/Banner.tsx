import { useState, useEffect } from "react";
import { Button } from "antd";
import mylover from "@/assets/images/mylover.png";
import { FaArrowRight } from "react-icons/fa";
import { useArchive } from "@/hooks/useArchive";
import { IBannerInitialState } from "@/services/store/banner/banner.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllBanners } from "@/services/store/banner/banner.thunk";

const bannerData = [
  {
    title: "Độc Quyền Cổ Điển",
    subtitle: "Bộ Sưu Tập Nữ",
    discount: "GIẢM ĐẾN 40%",
    imageUrl: mylover,
  },
  {
    title: "Giảm Giá Mùa Hè",
    subtitle: "Bộ Sưu Tập Nam",
    discount: "GIẢM ĐẾN 50%",
    imageUrl: mylover,
  },
  {
    title: "Hàng Mới Về",
    subtitle: "Bộ Sưu Tập Trẻ Em",
    discount: "GIẢM ĐẾN 30%",
    imageUrl: mylover,
  },
  {
    title: "Đặc Biệt Mùa Đông",
    subtitle: "Phụ Kiện",
    discount: "GIẢM ĐẾN 20%",
    imageUrl: mylover,
  },
];

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
        // setCurrentSlide((prevSlide) => (prevSlide + 1) % length);

        setCurrentSlide((prevSlide) => (prevSlide + 1) % length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [length]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-sm bg-gray-10% px-5 md:h-[500px] lg:h-[600px]">
      {state.banners.map((slide, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex h-full items-center justify-center px-4 md:flex-row md:justify-between md:px-16">
            <div className="z-10 w-full space-y-4 text-center md:w-1/2 md:space-y-6 md:text-left">
              <h3 className="text-gray-800 text-lg font-medium md:text-2xl">{slide.title}</h3>
              <h2 className="text-gray-900 text-3xl font-bold md:text-6xl">{slide.description}</h2>
              {/* <p className="text-gray-700 text-lg font-medium md:text-2xl">{slide.discount}</p> */}
              <Button type="default" className="h-auto bg-dark-500 px-4 py-2 text-sm text-white-500 md:px-6 md:py-2 md:text-lg">
                <a href={slide.path}>Mua ngay</a>
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
