import React, { useMemo } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface SortControlsProps {
  onSortChange: (orderBy: string, sort: string) => void;
  currentSort: string;
  currentOrderBy: string;
  showFilters: boolean;
  onToggleFiltersDesktop: () => void;
  onToggleFilters: () => void;
}

interface SortOption {
  value: string;
  label: string;
}

const SortControls: React.FC<SortControlsProps> = ({
  onSortChange,
  currentSort,
  currentOrderBy,
  showFilters,
  onToggleFilters,
  onToggleFiltersDesktop,
}) => {
  const sortOptions: SortOption[] = useMemo(
    () => [
      { value: "createdAt", label: "Mới nhất" },
      { value: "price", label: "Giá: Cao-Thấp" },
      { value: "price", label: "Giá: Thấp-Cao" },
      { value: "featured", label: "Nổi bật" },
    ],
    [],
  );

  const handleSortChange = (option: SortOption) => {
    const sort = option.label.includes("High-Low") ? "desc" : "asc";
    const orderBy = option.value;
    onSortChange(orderBy, sort);
  };

  const getCurrentSortLabel = () => {
    return (
      sortOptions.find(
        (opt) =>
          opt.value === currentOrderBy &&
          ((opt.label.includes("High-Low") && currentSort === "desc") ||
            (opt.label.includes("Low-High") && currentSort === "asc") ||
            (!opt.label.includes("High") && !opt.label.includes("Low"))),
      )?.label || "Newest"
    );
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white-500 px-4 py-2 md:flex-row md:py-0">
      <button
        onClick={() => {
          onToggleFiltersDesktop();
          onToggleFilters();
        }}
        className="flex items-center gap-2 px-4 py-2 text-dark-80% hover:text-dark-90% md:py-0"
      >
        <SlidersHorizontal size={20} />
        <span className="whitespace-nowrap">{showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}</span>
      </button>

      <div className="relative mt-2 md:mt-0">
        <div className="flex items-center gap-2">
          <div className="group relative">
            <button className="flex items-center gap-2 rounded-md bg-white-500 px-2 py-2 hover:bg-gray-20%">
              {getCurrentSortLabel()}
              <ChevronDown size={16} />
            </button>

            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-transparent"></div>

            <div className="absolute right-0 top-[calc(100%-2px)] z-50 hidden transform rounded-md border bg-white-500 shadow-lg transition-all duration-200 ease-in-out group-hover:block">
              <div className="pt-2">
                {sortOptions.map((option, index) => (
                  <button
                    key={index}
                    className="block w-full whitespace-nowrap px-4 py-2 text-left transition-colors duration-150 hover:bg-gray-20%"
                    onClick={() => handleSortChange(option)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;
