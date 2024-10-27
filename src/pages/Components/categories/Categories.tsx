import React from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

import CategoryCard from "@/components/common/CategoryCard";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";

import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useArchive } from "@/hooks/useArchive";
import { ICategoryInitialState } from "@/services/store/category/category.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllCategories } from "@/services/store/category/category.thunk";

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
  const carouselRef = React.useRef<CarouselRef>(null);

  const { state, dispatch } = useArchive<ICategoryInitialState>("category");
  const {} = useAsyncEffect(
    (async) => async(dispatch(getAllCategories({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
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
        <Title text="Danh mục sản phẩm" className="text-4xl" />
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
          {state.categories.map((category, index) => (
            <div key={index} className="px-2">
              <a href={category.path}>
                <CategoryCard background={category.imageUrl} name={category.name} />
              </a>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
