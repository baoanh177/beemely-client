import Title from "antd/es/typography/Title";
import FormCheck from "@/components/form/FormCheck";
import { formatPrice } from "@/utils/curency";
import { useEffect, useState } from "react";
import { Space, Slider } from "antd";
import { getAllColor } from "@/services/store/color/color.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { getAllSize } from "@/services/store/size/size.thunk";
import { ChevronDown, ChevronUp, Diameter, PaintbrushIcon, PawPrint, ShoppingBasket, Sparkles } from "lucide-react";
import { IProductTypeInitialState } from "@/services/store/product-type/product-type.slice";
import { getAllProductTypes } from "@/services/store/product-type/product-type.thunk";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { getAllBrand } from "@/services/store/brand/brand.thunk";

interface SidebarProps {
  filters: {
    color: string[];
    size: string[];
    brand: string[];
    productType: string[];
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (type: string, value: string | string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const { state: stateColors, dispatch: dispatchColors } = useArchive<IColorInitialState>("colors");
  const { colors } = stateColors;
  const { state: stateSizes, dispatch: dispatchSizes } = useArchive<ISizeInitialState>("sizes");
  const { sizes } = stateSizes;
  const { state: stateProductTypes, dispatch: dispatchProductTypes } = useArchive<IProductTypeInitialState>("productTypes");
  const { productTypes } = stateProductTypes;
  const { state: stateBrands, dispatch: dispatchBrands } = useArchive<IBrandInitialState>("brands");
  const { brands } = stateBrands;
  const [expandedSections, setExpandedSections] = useState({
    productType: false,
    brand: false,
    price: false,
    color: false,
    size: false,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([Number(filters.minPrice) || 0, Number(filters.maxPrice) || 10000000]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  useEffect(() => {
    dispatchSizes(getAllSize());
  }, [dispatchSizes]);

  useEffect(() => {
    dispatchColors(getAllColor());
  }, [dispatchColors]);

  useEffect(() => {
    dispatchProductTypes(getAllProductTypes());
  }, [dispatchProductTypes]);

  useEffect(() => {
    dispatchBrands(getAllBrand());
  }, [dispatchBrands]);

  useEffect(() => {
    setPriceRange([Number(filters.minPrice) || 0, Number(filters.maxPrice) || 10000000]);
  }, [filters.minPrice, filters.maxPrice]);

  const handleCheckboxChange = (type: string, value: string) => {
    const currentValues = filters[type as keyof typeof filters] as string[];
    const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
    onFilterChange(type, newValues);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onFilterChange("minPrice", value[0].toString());
    onFilterChange("maxPrice", value[1].toString());
  };

  return (
    <div className="sidebar md:bg-gray-100 p-4 md:w-80 md:p-8">
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("productType")}>
          <div className="flex items-center gap-2">
            <ShoppingBasket className="text-lg text-options-8" />
            <Title level={5} className="text-gray-800 m-0">
              Thể loại giày
            </Title>
          </div>
          <span>{expandedSections.productType ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
        </div>
        {expandedSections.productType && (
          <Space direction="vertical">
            {productTypes.map((productType) => (
              <FormCheck
                key={productType.id}
                id={`productType-${productType.id}`}
                checked={filters.productType.includes(productType.id)}
                onChange={() => handleCheckboxChange("productType", productType.id)}
                label={productType.name}
                value={productType.id}
                name="productType"
              />
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("brand")}>
          <div className="flex items-center gap-2">
            <PawPrint className="text-lg text-options-7" />
            <Title level={5} className="text-gray-800 m-0">
              Giới tính
            </Title>
          </div>
          <span>{expandedSections.brand ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
        </div>
        {expandedSections.brand && (
          <Space direction="vertical">
            {brands.map((brand) => (
              <FormCheck
                key={brand.id}
                id={`brand-${brand.id}`}
                checked={filters.brand.includes(brand.id)}
                onChange={() => handleCheckboxChange("brand", brand.id)}
                label={brand.name}
                value={brand.id}
                name="brand"
              />
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("price")}>
          <div className="flex items-center gap-2">
            <Sparkles className="text-lg text-options-6" />
            <Title level={5} className="text-gray-800 m-0">
              Khoảng giá
            </Title>
          </div>
          <span>{expandedSections.price ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
        </div>
        {expandedSections.price && (
          <Space direction="vertical" className="w-full">
            <div className="mb-2 flex justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <Slider
              range
              min={0}
              max={10000000}
              step={100000}
              value={priceRange}
              onChange={(value) => handlePriceChange(value as number[])}
              className="w-full"
            />
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("color")}>
          <div className="flex items-center gap-2">
            <PaintbrushIcon className="text-lg text-options-5" />
            <Title level={5} className="text-gray-800 m-0">
              Màu sắc
            </Title>
          </div>
          <span>{expandedSections.color ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
        </div>
        {expandedSections.color && (
          <Space direction="vertical">
            {colors.map((color) => (
              <FormCheck
                key={color.id}
                id={`color-${color.id}`}
                checked={filters.color.includes(color.id)}
                onChange={() => handleCheckboxChange("color", color.id)}
                label={color.name}
                value={color.id}
                name="color"
              />
            ))}
          </Space>
        )}
      </div>
      <div className="filter-section mb-4">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection("size")}>
          <div className="flex items-center gap-2">
            <Diameter className="text-lg text-options-9" />
            <Title level={5} className="text-gray-800 m-0">
              Kích cỡ
            </Title>
          </div>
          <span>{expandedSections.size ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
        </div>
        {expandedSections.size && (
          <div className="space-y-2">
            {sizes.map((size) => (
              <FormCheck
                key={size.id}
                id={`size-${size.id}`}
                checked={filters.size.includes(size.id)}
                onChange={() => handleCheckboxChange("size", size.id)}
                label={`Cỡ ${size.name}`}
                value={size.id}
                name="size"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
