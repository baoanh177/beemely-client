import React, { useState } from "react";
import tw from "twin.macro";
import { RightOutlined } from "@ant-design/icons";
import ProductCategories from "./ProductCategories";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

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
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <FilterComponent title="Product Categories" isExpanded={expandedSections.categories} onToggle={() => toggleSection("categories")}>
        <ProductCategories />
      </FilterComponent>

      <FilterComponent title="Filter by Price" isExpanded={expandedSections.price} onToggle={() => toggleSection("price")}>
        <PriceFilter />
      </FilterComponent>

      <FilterComponent title="Filter by Color" isExpanded={expandedSections.color} onToggle={() => toggleSection("color")}>
        <ColorFilter />
      </FilterComponent>

      <FilterComponent title="Filter by Size" isExpanded={expandedSections.size} onToggle={() => toggleSection("size")}>
        <SizeFilter />
      </FilterComponent>
    </div>
  );
};

export default ProductFilter;
