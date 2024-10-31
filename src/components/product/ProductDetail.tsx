import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

import { useArchive } from "@/hooks/useArchive";
import { addToCart } from "@/services/store/cart/cart.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IProduct, IVariant } from "@/services/store/product/product.model";
import { ICartInitialState, resetStatus } from "@/services/store/cart/cart.slice";
import Button from "@/components/common/Button";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { useProductModal } from "@/hooks/useProductModal";
import DescriptionSection from "./DescriptionSection";
import PriceSection from "./PriceSection";
import StarSection from "./StarSection";
import StockSection from "./StockSection";
import ColorSelectSection from "./ColorSelectSection";
import SizeSelectSection from "./SizeSelectSection";
import QuantityInput from "../common/QuantityInput";
import { IWishListInitialState } from "@/services/store/wishlist/wishlist.slice";
import { addWishList } from "@/services/store/wishlist/wishlist.thunk";
import toast from "react-hot-toast";

interface ProductDetailsProps {
  product: IProduct;
  selectedVariant: IVariant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<IVariant | null>>;
}

const ProductDetails = ({ product, selectedVariant, setSelectedVariant }: ProductDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { dispatch: cartDispatch, state: cartState } = useArchive<ICartInitialState>("cart");
  const { dispatch: wishlistDispatch } = useArchive<IWishListInitialState>("wishlist");

  const { isOpen, onClose } = useProductModal();

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants.find((v) => v.color.id === selectedColor && v.size.id === selectedSize);
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [product, selectedColor, selectedSize, setSelectedVariant]);

  const handleAddWishlist = () => {
    if (product?.id) {
      wishlistDispatch(addWishList({ param: product.id }))
        .then(() => {
          toast.success("Thêm vào Wishlist thành công!");
        })
        .catch(() => {
          toast.error("Thêm vào Wishlist thất bại");
        });
    }
  };

  const handleAddCart = () => {
    if (product?.id && selectedVariant) {
      setIsAddingToCart(true);
      cartDispatch(
        addToCart({
          body: {
            product_id: product.id,
            variant_id: selectedVariant.id,
            quantity: quantity,
          },
        }),
      ).finally(() => {
        setIsAddingToCart(false);
      });
    }
  };

  useFetchStatus({
    module: "cart",
    reset: resetStatus,
    actions: isAddingToCart
      ? {
          success: {
            message: "Thêm giỏ hàng thành công!",
            onFinish: isOpen ? onClose : undefined,
          },
          error: {
            message: cartState.message,
          },
        }
      : undefined,
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <p className="mt-1 text-3xl font-bold">{product.brand.name}</p>
        <h2 className="text-gray-900 text-2xl font-medium">{product.name}</h2>
      </div>

      <StarSection count={200} rating={2.6} />

      <PriceSection regularPrice={selectedVariant.price} discountPrice={selectedVariant.discountPrice} />

      <DescriptionSection content={product.sortDescription} />

      <ColorSelectSection colors={product?.productColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <SizeSelectSection sizes={product?.productSizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

      <StockSection stock={selectedVariant.stock} />

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <p>Số lượng:</p>
          <QuantityInput value={quantity} onChange={setQuantity} max={selectedVariant.stock} />
        </div>
        <div className="flex w-full gap-4">
          <Button
            isDisabled={!selectedSize || !selectedColor || cartState.status === EFetchStatus.PENDING}
            icon={<FaShoppingCart className="mr-2" />}
            onClick={handleAddCart}
            className="grow"
            text="Thêm sản phẩm vào giỏ hàng"
          />
          <Button icon={<BsHeart className="h-5 w-5" />} variant="ghost" shape="rectangle" onClick={handleAddWishlist} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
