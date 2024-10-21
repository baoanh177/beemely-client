import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { RightOutlined } from "@ant-design/icons";
import ProductCategories from "./ProductCategories";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
import { useArchive } from "@/hooks/useArchive";
import { IProductTypeInitialState } from "@/services/store/product-type/product-type.slice";
import { getAllProductTypes } from "@/services/store/product-type/product-type.thunk";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { ISizeInitialState } from "@/services/store/size/size.slice";

const FilterSection = tw.div`mb-4`;
const FilterHeader = tw.div`flex items-center cursor-pointer`;
const FilterTitle = tw.h3`font-bold mr-2 flex-grow mb-2`;
const RotateIcon = tw(RightOutlined)`transition-transform duration-300`;

interface FilterComponentProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ title, isExpanded, onToggle, children }) => (
  <FilterSection>
    <FilterHeader onClick={onToggle}>
      <FilterTitle>{title}</FilterTitle>
      <RotateIcon style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", fontSize: "12px" }} />
    </FilterHeader>
    <div className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isExpanded ? "max-h-screen" : "max-h-0"}`}>{children}</div>
  </FilterSection>
);

const ProductFilter: React.FC = () => {
  const { state, dispatch } = useArchive<IProductTypeInitialState>("productTypes");
  const { productTypes } = state;

  const { state: colorState } = useArchive<IColorInitialState>("colors");
  const { colors } = colorState;

  const { state: sizeState } = useArchive<ISizeInitialState>("sizes");
  const { sizes } = sizeState;

  useEffect(() => {
    dispatch(getAllProductTypes());
  }, [dispatch]);

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
  });

  const productType = productTypes.map((productType) => {
    return <ProductCategories key={productType.slug} id={productType.id} name={productType.name} slug={productType.slug} checked={false} />;
  });

  const color = colors.map((color) => {
    return <ColorFilter key={color.id} id={color.id} name={color.name} value={color.value} checked={false} count={10} />;
  });

  const size = sizes.map((size) => {
    return <SizeFilter key={size.id} id={size.id} name={size.name} count={10} checked={false} />;
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <FilterComponent title="Kiểu giày" isExpanded={expandedSections.categories} onToggle={() => toggleSection("categories")}>
        {productType}
      </FilterComponent>

      <FilterComponent title="Lọc theo giá" isExpanded={expandedSections.price} onToggle={() => toggleSection("price")}>
        <PriceFilter />
      </FilterComponent>

      <FilterComponent title="Lọc theo màu sắc" isExpanded={expandedSections.color} onToggle={() => toggleSection("color")}>
        {color}
      </FilterComponent>

      <FilterComponent title="Lọc theo kích cỡ" isExpanded={expandedSections.size} onToggle={() => toggleSection("size")}>
        {size}
      </FilterComponent>
    </div>
  );
};

export default ProductFilter;
