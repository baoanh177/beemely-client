import React from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoryCard from "@/components/common/CategoryCard";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IProductTypeInitialState } from "@/services/store/product-type/product-type.slice";
import { getAllProductTypes } from "@/services/store/product-type/product-type.thunk";

const Categories: React.FC = () => {
  const carouselRef = React.useRef<CarouselRef>(null);

  const { state, dispatch } = useArchive<IProductTypeInitialState>("productTypes");
  const {} = useAsyncEffect(
    (async) => async(dispatch(getAllProductTypes({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );
  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <Title text="Danh mục sản phẩm" className="text-xl md:text-3xl" />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            shape="rectangle"
            icon={<IoMdArrowBack className="h-4 w-4" />}
            onClick={handlePrev}
            aria-label="Previous slide"
          />
          <Button
            variant="primary"
            shape="rectangle"
            icon={<IoMdArrowForward className="h-4 w-4" />}
            onClick={handleNext}
            aria-label="Next slide"
          />
        </div>
      </div>
      <div className="product-list-container">
        <Carousel
          ref={carouselRef}
          slidesToShow={4}
          responsive={[
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
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          dots={false}
          infinite
        >
          {state.productTypes.map((category, index) => (
            <div key={index} className="px-2">
              <Link to={`/products/${category.slug}`}>
                <CategoryCard background={category.imageUrl} name={category.name} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
