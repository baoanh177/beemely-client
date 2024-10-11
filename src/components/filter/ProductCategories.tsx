import React from "react";
import tw from "twin.macro";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Container = tw.div`flex flex-col space-y-2`;
const CategoryItem = tw.div`flex items-center justify-between`;
const ExpandIcon = tw.span`cursor-pointer`;
const CheckboxLabel = tw.div`flex-grow flex items-center space-x-2`;

interface Category {
  name: string;
  checked: boolean;
  expanded?: boolean;
}

const categories: Category[] = [
  { name: "Men", checked: true, expanded: false },
  { name: "Women", checked: false, expanded: false },
  { name: "Kids", checked: false, expanded: false },
  { name: "Bags", checked: false, expanded: false },
  { name: "Belts", checked: false, expanded: false },
  { name: "Wallets", checked: false, expanded: false },
  { name: "Watches", checked: false, expanded: false },
  { name: "Accessories", checked: false, expanded: false },
  { name: "Winter Wear", checked: false, expanded: false },
];

const ProductCategories: React.FC = () => {
  const [categoryList, setCategoryList] = React.useState<Category[]>(categories);

  const handleCheckboxChange = (index: number) => (e: CheckboxChangeEvent) => {
    const newList = [...categoryList];
    newList[index].checked = e.target.checked;
    setCategoryList(newList);
  };

  const handleExpand = (index: number) => () => {
    const newList = [...categoryList];
    newList[index].expanded = !newList[index].expanded;
    setCategoryList(newList);
  };

  return (
    <Container>
      {categoryList.map((category, index) => (
        <CategoryItem key={category.name}>
          <CheckboxLabel>
            <Checkbox checked={category.checked} onChange={handleCheckboxChange(index)} className="checked:bg-checkbox-checked">
              {category.name}
            </Checkbox>
          </CheckboxLabel>
          {category.expanded !== undefined && <ExpandIcon onClick={handleExpand(index)}>{category.expanded ? "-" : "+"}</ExpandIcon>}
        </CategoryItem>
      ))}
    </Container>
  );
};

export default ProductCategories;
