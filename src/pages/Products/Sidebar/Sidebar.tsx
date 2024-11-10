import React, { useEffect, useState } from "react";
import { Checkbox, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { IProduct } from "@/services/store/product/product.model";
import { Diameter, PaintbrushIcon, ShoppingBasket, PawPrint, Plus, Minus, DollarSignIcon } from "lucide-react";
import Title from "antd/es/typography/Title";
import { getAllColor } from "@/services/store/color/color.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import "@/pages/Products/Products.scss";

interface SidebarProps {
  handleChange: (event: CheckboxChangeEvent) => void;
  products: IProduct[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleChange, products }) => {
  const { state, dispatch } = useArchive<IColorInitialState>("colors");
  const { colors } = state;
  const [productColors, setProductColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    price: true,
    color: true,
    size: true,
  });

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);

  useEffect(() => {
    const uniqueColors = Array.from(new Set(products.flatMap((product) => product.variants.map((variant) => variant.color.name))));
    setProductColors(uniqueColors);
  }, [products]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const categories = Array.from(new Set(products.map((product) => product.productType.name.toString())));
  const genders = Array.from(new Set(products.map((product) => product.gender.name.trim())));
  const sizes = Array.from(new Set(products.flatMap((product) => product.productSizes.map((size) => size.name.toString()))));

  const priceRanges = [
    { value: "0-500000", label: "Dưới 500.000 VND" },
    { value: "500000-1500000", label: "500.000 VND - 1.500.000 VND" },
    { value: "1500000-2500000", label: "1.500.000 VND - 2.500.000 VND" },
    { value: "2500000-4000000", label: "2.500.000 VND - 4.000.000 VND" },
    { value: "4000000-", label: "Trên 4.000.000 VND" },
  ];

  return (
    <div className="sidebar md:bg-gray-100 p-4 md:w-80 md:p-8">
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("category")}>
          <div className="flex items-center gap-2">
            <ShoppingBasket className="text-options-8 text-lg" />
            <Title level={5} className="text-gray-800 m-0">
              Thể loại giày
            </Title>
          </div>
          <span>{expandedSections.category ? <Minus size={14} className="text-dark-500" /> : <Plus size={14} className="text-dark-500" />}</span>
        </div>
        {expandedSections.category && (
          <Space direction="vertical">
            {categories.map((category) => (
              <Checkbox key={category} className="custom-checkbox" value={category} name="category" onChange={handleChange}>
                {category}
              </Checkbox>
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("gender")}>
          <div className="flex items-center gap-2">
            <PawPrint className="text-options-7 text-lg" />
            <Title level={5} className="text-gray-800 m-0">
              Giới tính
            </Title>
          </div>
          <span>{expandedSections.gender ? <Minus size={14} className="text-dark-500" /> : <Plus size={14} className="text-dark-500" />}</span>
        </div>
        {expandedSections.gender && (
          <Space direction="vertical">
            {genders.map((gender) => (
              <Checkbox key={gender} className="custom-checkbox" value={gender} name="gender" onChange={handleChange}>
                {gender}
              </Checkbox>
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("price")}>
          <div className="flex items-center gap-2">
            <DollarSignIcon className="text-options-6 h-5 w-5" />
            <Title level={5} className="text-gray-800 m-0">
              Khoảng giá
            </Title>
          </div>
          <span>{expandedSections.price ? <Minus size={14} className="text-dark-500" /> : <Plus size={14} className="text-dark-500" />}</span>
        </div>
        {expandedSections.price && (
          <Space direction="vertical">
            {priceRanges.map((range) => (
              <Checkbox key={range.value} className="custom-checkbox" value={range.value} name="price" onChange={handleChange}>
                {range.label}
              </Checkbox>
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("color")}>
          <div className="flex items-center gap-2">
            <PaintbrushIcon className="text-options-5 h-5 w-5" />
            <Title level={5} className="text-gray-800 m-0">
              Màu sắc
            </Title>
          </div>
          <span>{expandedSections.color ? <Minus size={14} className="text-dark-500" /> : <Plus size={14} className="text-dark-500" />}</span>
        </div>
        {expandedSections.color && (
          <Space direction="vertical">
            {productColors.map((productColor) => {
              const color = colors.find((c) => c.name === productColor);
              return (
                <Checkbox key={productColor} className="custom-checkbox" value={productColor} name="color" onChange={handleChange}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{
                        backgroundColor: color?.value,
                        border: color?.value.toLowerCase() === "#ffffff" ? "1px solid #e5e7eb" : "none",
                      }}
                    />
                    {productColor}
                  </div>
                </Checkbox>
              );
            })}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("size")}>
          <div className="flex items-center gap-2">
            <Diameter className="text-options-9 h-5 w-5" />
            <Title level={5} className="text-gray-800 m-0">
              Kích cỡ
            </Title>
          </div>
          <span>{expandedSections.size ? <Minus size={14} className="text-dark-500" /> : <Plus size={14} className="text-dark-500" />}</span>
        </div>
        {expandedSections.size && (
          <div className="space-y-2">
            {sizes.map((size) => (
              <Checkbox key={size} className="custom-checkbox" value={size} name="size" onChange={handleChange}>
                {size}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
