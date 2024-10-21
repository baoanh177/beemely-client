import React from "react";
import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Container = tw.div`flex flex-col space-y-2`;
const ColorItem = tw.div`flex items-center justify-between`;
const ColorSwatch = tw.span`w-4 h-4 mr-2 inline-block rounded-full`;

interface IColorOption {
  id: string;
  name: string;
  value: string;
  count?: number;
  checked: boolean;
}

const ColorFilter = ({ id, name, value, count, checked = false }: IColorOption) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    console.log(id, e.target.checked);
  };

  return (
    <Container>
      <ColorItem key={id}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
          <ColorSwatch style={{ backgroundColor: value }} />
          {name}
        </Checkbox>
        <span className="text-xs">({count})</span>
      </ColorItem>
    </Container>
  );
};

export default ColorFilter;
