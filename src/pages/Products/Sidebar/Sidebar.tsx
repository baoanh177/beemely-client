import { useEffect } from "react";
import { Checkbox, Space } from "antd";
import { getAllColor } from "@/services/store/color/color.thunk";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { getAllSize } from "@/services/store/size/size.thunk";

interface SidebarProps {
  filters: {
    gender: string;
    color: string[];
    size: string[];
  };
  onFilterChange: (type: string, value: string | string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const { state: stateColors, dispatch: dispatchColors } = useArchive<IColorInitialState>("colors");
  const { colors } = stateColors;
  const { state: stateSizes, dispatch: dispatchSizes } = useArchive<ISizeInitialState>("sizes");
  const { sizes } = stateSizes;

  useEffect(() => {
    dispatchSizes(getAllSize());
    dispatchColors(getAllColor());
  }, [dispatchColors]);

  const handleCheckboxChange = (type: string, value: string) => {
    if (type === "size" || type === "color") {
      const currentValues = filters[type];
      const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
      onFilterChange(type, newValues);
    } else {
      onFilterChange(type, value);
    }
  };

  return (
    <div>
      <Space direction="vertical">
        {colors.map((color) => (
          <Checkbox key={color.id} checked={filters.color.includes(color.id)} onChange={() => handleCheckboxChange("color", color.id)}>
            {color.name}
          </Checkbox>
        ))}
      </Space>
      <Space direction="vertical">
        {sizes.map((size) => (
          <Checkbox key={size.id} checked={filters.color.includes(size.id)} onChange={() => handleCheckboxChange("color", size.id)}>
            {size.name}
          </Checkbox>
        ))}
      </Space>
    </div>
  );
};

export default Sidebar;
