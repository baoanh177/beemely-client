import { IProductColor } from "@/services/store/product/product.model";
import { Tooltip } from "antd";
import clsx from "clsx";
interface ColorSelectSectionProps {
  colors: IProductColor[];
  selectedColor: string;
  isDisable: boolean;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorSelectSection = ({ colors, selectedColor, setSelectedColor, isDisable }: ColorSelectSectionProps) => {
  return (
    <div>
      <h3 className="text-gray-900 text-sm font-medium">Chọn màu: </h3>
      <div className="mt-2 flex space-x-2">
        {colors.map((color) => (
          <Tooltip title={isDisable ? <>Vui lòng chọn size trước</> : color.colorId.name} key={color.id}>
            <button
              disabled={isDisable}
              key={color.id}
              className={clsx(
                "flex h-11 w-11 items-center justify-center rounded-md border border-primary-10%",
                selectedColor === color.colorId.id ? "border-primary-500" : "",
                isDisable && "cursor-not-allowed",
              )}
              style={{ backgroundColor: color.colorId.value }}
              onClick={() => setSelectedColor(color.colorId.id)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ColorSelectSection;
