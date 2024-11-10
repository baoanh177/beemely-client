import clsx from "clsx";
import { Image, Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Button from "../common/Button";

interface ProductGalleryProps {
  thumbnail: string;
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ thumbnail, images }) => {
  const formattedImages = useMemo(() => [thumbnail, ...images], [thumbnail, images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.goTo(index);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Carousel ref={carouselRef} beforeChange={(_, next) => setCurrentIndex(next)} dots={false} infinite className="aspect-square w-full">
          {formattedImages.map((img, index) => (
            <div key={index} className="relative w-full">
              <Image
                src={img}
                alt={`Product ${index + 1}`}
                width={"100%"}
                height={"100%"}
                className="aspect-square h-full w-full object-cover"
                preview={true}
              />
            </div>
          ))}
        </Carousel>

        {formattedImages.length > 1 && (
          <>
            <Button
              icon={<LeftOutlined className="h-4 w-4" />}
              shape="rounded"
              variant="secondary"
              onClick={() => carouselRef.current?.prev()}
              className="absolute left-2 top-1/2 z-10 w-20 -translate-y-1/2 transform"
            />
            <Button
              icon={<RightOutlined className="h-4 w-4" />}
              shape="rounded"
              variant="secondary"
              onClick={() => carouselRef.current?.next()}
              className="absolute right-2 top-1/2 z-10 w-20 -translate-y-1/2 transform"
            />
          </>
        )}
      </div>

      {formattedImages.length > 1 && (
        <div ref={thumbnailsContainerRef} className="relative hidden md:block">
          <div
            className="w-full overflow-x-auto"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex space-x-4 p-2">
              {formattedImages.map((img, index) => (
                <div
                  key={index}
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  className={clsx(
                    "relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2",
                    index === currentIndex ? "border-2 border-primary-80%" : "border-transparent",
                  )}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image src={img} alt={`Thumbnail ${index + 1}`} className="aspect-square object-cover" preview={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
