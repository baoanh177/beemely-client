import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";

const Container = tw.div`flex flex-col space-y-2`;
const CategoryItem = tw.div`flex items-center justify-between`;
const ExpandIcon = tw.span`cursor-pointer`;
const CheckboxLabel = tw.div`flex-grow flex items-center space-x-2`;

interface ICategory {
  id: string;
  name: string;
  slug: string;
  checked: boolean;
  expanded?: boolean;
}

const ProductCategories = ({ id, name, slug, checked = false, expanded = false }: ICategory) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    console.log(id, e.target.checked);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    console.log(id);
  };
  return (
    <Container>
      <CategoryItem key={slug}>
        <CheckboxLabel>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} className="checked:bg-checkbox-checked">
            {name}
          </Checkbox>
        </CheckboxLabel>
        {expanded !== undefined && <ExpandIcon onClick={handleExpand}>{isExpanded ? "-" : "+"}</ExpandIcon>}
      </CategoryItem>
    </Container>
  );
};

export default ProductCategories;
