import { ISize } from "@/services/store/product/product.model";
import clsx from "clsx";

interface SizeSelectSectionProps {
  sizes: ISize[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

const SizeSelectSection = ({ sizes, selectedSize, setSelectedSize }: SizeSelectSectionProps) => {
  return (
    <div>
      <h3 className="text-gray-900 text-sm font-medium">Chọn kích cỡ: </h3>
      <div className="mt-2 flex flex-wrap gap-4">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={clsx(
              "h-11 w-11 rounded-md border border-primary-500 text-base font-semibold",
              selectedSize === size.id ? "bg-primary-600 text-primary-5%" : "border-gray-300 text-gray-700",
            )}
            onClick={() => setSelectedSize(size.id)}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelectSection;
