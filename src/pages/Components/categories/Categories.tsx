import Button from "@/components/common/Button";
import CategoryCard from "@/components/common/CategoryCard";
import Title from "@/components/common/Title";
import { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const categoriesData = [
  {
    name: "Ethnic Wear",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQcomXUzdpwhHdzndL4q11JANkQ5ek4pvC63w1h0lmSZPO0J-1aq3O5pgn_-REZxIvzY&usqp=CAU",
  },
  {
    name: "Ethnic Wear",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTs2nZu5KtEVqMKiKxPnlN3l4eH1L04tJwtFYazHswojRUGC6_yTF85aRIjbDo3dRIY-g&usqp=CAU",
  },
  {
    name: "Ethnic Wear",
    imageUrl: "kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
  },
  {
    name: "Ethnic Wear",
    imageUrl: "kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
  },
  {
    name: "Ethnic Wear",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQcomXUzdpwhHdzndL4q11JANkQ5ek4pvC63w1h0lmSZPO0J-1aq3O5pgn_-REZxIvzY&usqp=CAU",
  },
  {
    name: "Ethnic Wear",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTs2nZu5KtEVqMKiKxPnlN3l4eH1L04tJwtFYazHswojRUGC6_yTF85aRIjbDo3dRIY-g&usqp=CAU",
  },
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<number>(2);
  const totalItems = categoriesData.length;

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      setVisibleItems(width < 768 ? 2 : 4);
    };

    window.addEventListener("resize", updateVisibleItems);
    updateVisibleItems();

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalItems - visibleItems : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalItems - visibleItems ? 0 : prevIndex + 1));
  };

  return (
    <div className="overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <Title text="What our Customers say" />
        <div className="flex gap-2">
          <Button variant="secondary" shape="rectangle" icon={<IoMdArrowBack />} onClick={handlePrev} />
          <Button variant="primary" shape="rectangle" icon={<IoMdArrowForward />} onClick={handleNext} />
        </div>
      </div>
      <div
        className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {categoriesData.map((category, index) => (
          <div key={index} className="w-[calc((100%_-_96px)/4] flex-shrink-0 md:w-1/4">
            <CategoryCard background={category.imageUrl} name={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
