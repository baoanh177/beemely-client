import React, { useMemo, useState, useEffect, useRef } from "react";

export interface IFilterTableStatusOptions {
  value: string;
  label: string;
}

export interface IFilterTableStatusProps {
  options: IFilterTableStatusOptions[];
  onChange?: (selectedOption: IFilterTableStatusOptions) => void;
  name?: string;
}

const FilterTableStatus: React.FC<IFilterTableStatusProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<IFilterTableStatusOptions>({ value: "", label: "Tất cả" });
  const fullOptions = useMemo(() => [{ value: "", label: "Tất cả" }, ...options], [options]);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [JSON.stringify(selectedOption)]);

  const handleClick = (option: IFilterTableStatusOptions, index: number) => {
    if (selectedOption.value !== option.value) {
      setSelectedOption(option);
      if (tabRefs.current[index]) {
        tabRefs.current[index]!.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  return (
      <div className="scrollbar w-full flex h-[45px] cursor-pointer items-center overflow-x-auto rounded-lg p-1">
        {fullOptions.map((option, index) => (
          <div
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`text-m-medium h-full flex-shrink-0 px-3 py-[6px] ${
              selectedOption.value === option.value ? "text-m-semibold rounded-md bg-primary-10% text-primary-500" : "text-gray-500"
            } `}
            onClick={() => handleClick(option, index)}
          >
           <div className="w-full"> {option.label}</div>
          </div>
        ))}
      </div>
  );
};

export default FilterTableStatus;
