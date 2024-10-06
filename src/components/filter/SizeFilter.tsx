import React from "react";
import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Container = tw.div`flex flex-col space-y-2`;
const SizeItem = tw.div`flex items-center justify-between`;

interface SizeOption {
  name: string;
  count: number;
  checked: boolean;
}

const sizeOptions: SizeOption[] = [
  { name: "S", count: 6, checked: false },
  { name: "M", count: 20, checked: false },
  { name: "L", count: 7, checked: true },
  { name: "XL", count: 14, checked: false },
  { name: "XXL", count: 10, checked: false },
  { name: "XXXL", count: 2, checked: false },
];

const SizeFilter: React.FC = () => {
  const [sizes, setSizes] = React.useState<SizeOption[]>(sizeOptions);

  const handleSizeChange = (index: number) => (e: CheckboxChangeEvent) => {
    const newSizes = [...sizes];
    newSizes[index].checked = e.target.checked;
    setSizes(newSizes);
  };

  return (
    <Container>
      {sizes.map((size, index) => (
        <SizeItem key={size.name}>
          <Checkbox checked={size.checked} onChange={handleSizeChange(index)}>
            {size.name}
          </Checkbox>
          <span className="text-xs">({size.count})</span>
        </SizeItem>
      ))}
    </Container>
  );
};

export default SizeFilter;
