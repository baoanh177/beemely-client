import { ICartItem } from "@/services/store/cart/cart.model";
import { formatPrice } from "@/utils/curency";
import clsx from "clsx";

interface CartProductProps {
  item: ICartItem;
  className?: string;
  showPrice?: boolean;
}

const CartProduct = ({ item, className, showPrice = true }: CartProductProps) => {
  const { product, variant, quantity } = item;

  return (
    <div className={clsx("flex items-center justify-between gap-4", className)}>
      <img src={product.thumbnail} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
      <div className="flex-grow space-y-1">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.name}</h3>
        {showPrice && (
          <p className="block text-sm font-bold">
            {formatPrice(variant.discountPrice ? variant?.discountPrice * quantity : variant?.price * quantity)}
            <strong className="ml-2">x{quantity}</strong>
          </p>
        )}
        <p className="text-sm text-primary-90%">
          {variant?.color?.name} - Cỡ {variant?.size?.name}
        </p>
      </div>
    </div>
  );
};

export default CartProduct;
