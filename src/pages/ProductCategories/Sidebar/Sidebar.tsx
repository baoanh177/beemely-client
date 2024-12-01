import FormCheck from "@/components/form/FormCheck";
import { formatPrice } from "@/utils/curency";
import { useEffect, useState } from "react";
import { Space, Slider, ConfigProvider } from "antd";
import { getAllColor } from "@/services/store/color/color.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { getAllSize } from "@/services/store/size/size.thunk";
import { ChevronDown, ChevronUp, Diameter, PaintbrushIcon, PawPrint, Sparkles, X } from "lucide-react";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { getAllBrand } from "@/services/store/brand/brand.thunk";
import Title from "antd/es/typography/Title";

interface FilterState {
  color: string[];
  size: string[];
  brand: string[];
  productType: string[];
  minPrice: string;
  maxPrice: string;
}

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (type: keyof FilterState, value: string | string[]) => void;
  showMobileSidebar: boolean;
  showWidthFull: boolean;
  onCloseMobileSidebar: () => void;
}

interface ExpandedSections {
  productType: boolean;
  brand: boolean;
  price: boolean;
  color: boolean;
  size: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, showMobileSidebar, onCloseMobileSidebar }) => {
  const { state: stateColors, dispatch: dispatchColors } = useArchive<IColorInitialState>("colors");
  const { colors } = stateColors;

  const { state: stateSizes, dispatch: dispatchSizes } = useArchive<ISizeInitialState>("sizes");
  const { sizes } = stateSizes;

  const { state: stateBrands, dispatch: dispatchBrands } = useArchive<IBrandInitialState>("brands");
  const { brands } = stateBrands;

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    productType: false,
    brand: false,
    price: false,
    color: false,
    size: false,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([Number(filters.minPrice) || 0, Number(filters.maxPrice) || 10000000]);

  useEffect(() => {
    dispatchSizes(getAllSize({}));
    dispatchColors(getAllColor({}));
    dispatchBrands(getAllBrand({}));
  }, [dispatchSizes, dispatchColors, dispatchBrands]);

  useEffect(() => {
    setPriceRange([Number(filters.minPrice) || 0, Number(filters.maxPrice) || 10000000]);
  }, [filters.minPrice, filters.maxPrice]);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleCheckboxChange = (type: keyof FilterState, value: string) => {
    const currentValues = filters[type];
    const newValues = Array.isArray(currentValues)
      ? currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      : [];
    onFilterChange(type, newValues);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange("minPrice", value[0].toString());
    onFilterChange("maxPrice", value[1].toString());
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    section: keyof ExpandedSections;
    children: React.ReactNode;
  }> = ({ title, icon, section, children }) => (
    <div className="filter-section mb-4">
      <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => toggleSection(section)}>
        <div className="flex items-center gap-2">
          {icon}
          <Title level={5} className="text-gray-800 m-0">
            {title}
          </Title>
        </div>
        <span>{expandedSections[section] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
      </div>
      {expandedSections[section] && children}
    </div>
  );

  return (
    <>
      <div className="hidden md:block md:w-80">
        <div className="sidebar bg-white-500 p-8">
          <FilterSectionsContent />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-dark-90%/50 transition-opacity duration-300 md:hidden ${showMobileSidebar ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onCloseMobileSidebar}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-white-500 shadow-lg transition-transform duration-500 ease-in-out md:hidden ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Bộ lọc sản phẩm</h2>
          <button onClick={onCloseMobileSidebar} className="hover:bg-gray-100 rounded-full p-2" aria-label="Close filters">
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(100vh-64px)] overflow-y-auto p-4">
          <FilterSectionsContent />
        </div>

        <div className="border-t p-4">
          <button onClick={onCloseMobileSidebar} className="bg-black text-white hover:bg-gray-800 w-full rounded-md py-2">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );

  function FilterSectionsContent() {
    return (
      <>
        <FilterSection title="Thương hiệu" icon={<PawPrint className="text-lg text-options-7" />} section="brand">
          <Space direction="vertical" className="pl-2">
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
        </FilterSection>

        <FilterSection title="Khoảng giá" icon={<Sparkles className="text-lg text-options-6" />} section="price">
          <Space direction="vertical" className="w-full pl-2">
            <div className="mb-2 flex justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#000000",
                },
              }}
            >
              <Slider
                range
                min={0}
                max={10000000}
                step={100000}
                value={priceRange}
                onChange={(value) => handlePriceChange(value as [number, number])}
                className="w-full"
              />
            </ConfigProvider>
          </Space>
        </FilterSection>

        <FilterSection title="Màu sắc" icon={<PaintbrushIcon className="text-lg text-options-5" />} section="color">
          <Space direction="vertical" className="pl-2">
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
        </FilterSection>

        <FilterSection title="Kích cỡ" icon={<Diameter className="text-lg text-options-9" />} section="size">
          <div className="space-y-2 pl-2">
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
        </FilterSection>
      </>
    );
  }
};

export default Sidebar;
