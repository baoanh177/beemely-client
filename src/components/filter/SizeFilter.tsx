import React from "react";
import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Container = tw.div`flex flex-col space-y-2`;
const SizeItem = tw.div`flex items-center justify-between`;

interface ISizeOption {
  id: string;
  name: string;
  count: number;
  gender?: any;
  checked: boolean;
}

const SizeFilter = ({ id, name, count, checked = false }: ISizeOption) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const handleSizeChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <Container>
      <SizeItem key={id}>
        <Checkbox checked={isChecked} onChange={handleSizeChange}>
          {name}
        </Checkbox>
        <span className="text-xs">({count})</span>
      </SizeItem>
    </Container>
  );
};

export default SizeFilter;
