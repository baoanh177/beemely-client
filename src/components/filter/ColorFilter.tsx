import React from "react";
import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Container = tw.div`flex flex-col space-y-2`;
const ColorItem = tw.div`flex items-center justify-between`;
const ColorSwatch = tw.span`w-4 h-4 mr-2 inline-block rounded-full`;

interface ColorOption {
  name: string;
  colorClass: string;
  count: number;
  checked: boolean;
}

const colorOptions: ColorOption[] = [
  { name: "Red", colorClass: "bg-red-500", count: 10, checked: true },
  { name: "Blue", colorClass: "bg-blue-500", count: 14, checked: false },
  { name: "Orange", colorClass: "bg-orange-500", count: 8, checked: false },
  { name: "Green", colorClass: "bg-green-500", count: 4, checked: false },
  { name: "Yellow", colorClass: "bg-yellow-500", count: 2, checked: false },
  { name: "Primary 100", colorClass: "bg-primary-100", count: 5, checked: false },
  { name: "Secondary 300", colorClass: "bg-secondary-300", count: 7, checked: false },
  { name: "Tertiary 500", colorClass: "bg-tertiary-500", count: 3, checked: false },
];

const ColorFilter: React.FC = () => {
  const [colors, setColors] = React.useState<ColorOption[]>(colorOptions);

  const handleColorChange = (index: number) => (e: CheckboxChangeEvent) => {
    const newColors = [...colors];
    newColors[index].checked = e.target.checked;
    setColors(newColors);
  };

  return (
    <Container>
      {colors.map((color, index) => (
        <ColorItem key={color.name}>
          <Checkbox checked={color.checked} onChange={handleColorChange(index)}>
            <ColorSwatch className={color.colorClass} />
            {color.name}
          </Checkbox>
          <span className="text-xs">({color.count})</span>
        </ColorItem>
      ))}
    </Container>
  );
};

export default ColorFilter;
