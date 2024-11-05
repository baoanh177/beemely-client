import { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Button from "./Button";
import CustomerSay from "./CustomerSay";
import Title from "./Title";

const data = [
  {
    name: "Long",
    content:
      "Tôi tên là Long tôi đến từ Đông Anh tôi học tại trường fpoly đang thực tập tại AHT Tech năm nay tôi 24 tuổi tôi rất thích code đặc biệt là code php magento nó làm tôi chán vl:))",
    description: "Frontend Developer",
    avatar: "https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
    star: 3,
  },
  {
    name: "Long",
    content:
      "Tôi tên là Long tôi đến từ Đông Anh tôi học tại trường fpoly đang thực tập tại AHT Tech năm nay tôi 24 tuổi tôi rất thích code đặc biệt là code php magento nó làm tôi chán vl:))",
    description: "Backend Developer",
    avatar: "https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
    star: 4,
  },
  {
    name: "Long",
    content:
      "Tôi tên là Long tôi đến từ Đông Anh tôi học tại trường fpoly đang thực tập tại AHT Tech năm nay tôi 24 tuổi tôi rất thích code đặc biệt là code php magento nó làm tôi chán vl:))",
    description: "Fullstack Developer",
    avatar: "https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
    star: 5,
  },
  {
    name: "Long",
    content:
      "Tôi tên là Long tôi đến từ Đông Anh tôi học tại trường fpoly đang thực tập tại AHT Tech năm nay tôi 24 tuổi tôi rất thích code đặc biệt là code php magento nó làm tôi chán vl:))",
    description: "DevOps Engineer",
    avatar: "https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
    star: 4,
  },
  {
    name: "Long",
    content:
      "Tôi tên là Long tôi đến từ Đông Anh tôi học tại trường fpoly đang thực tập tại AHT Tech năm nay tôi 24 tuổi tôi rất thích code đặc biệt là code php magento nó làm tôi chán vl:))",
    description: "Frontend Developer",
    avatar: "https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg",
    star: 5,
  },
];

const CustomerSaySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const totalItems = data.length;

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleItems(1);
      } else {
        setVisibleItems(3);
      }
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
        <Title text="What our Custom say's" />
        <div className="flex gap-2">
          <Button variant="secondary" shape="rectangle" icon={<IoMdArrowBack />} onClick={handlePrev} />
          <Button variant="primary" shape="rectangle" icon={<IoMdArrowForward />} onClick={handleNext} />
        </div>
      </div>
      <div
        className="flex transition-transform duration-500 ease-in-out md:gap-8"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {data.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 md:w-[calc((100%_-_64px)/3)]">
            <CustomerSay star={item.star} content={item.content} name={item.name} description={item.description} avatar={item.avatar} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSaySlider;
