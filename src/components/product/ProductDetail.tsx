import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

import { useArchive } from "@/hooks/useArchive";
import { addToCart } from "@/services/store/cart/cart.thunk";
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
import { addWishList, moveWishlist } from "@/services/store/wishlist/wishlist.thunk";
import toast from "react-hot-toast";
import useFetchStatus from "@/hooks/useFetchStatus";
import { addProductToWishlist, IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useDispatch } from "react-redux";

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
  const { dispatch: wishlistDispatch, state: wishListState } = useArchive<IAuthInitialState>("auth");
  const { isOpen, onClose } = useProductModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants.find((v) => v.color.id === selectedColor && v.size.id === selectedSize);
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [product, selectedColor, selectedSize, setSelectedVariant]);

  const handleWishlistToggle = () => {
    if(!wishListState.profile) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào Wishlist!");
      return;
    }
    if (product.id) {
      if (isInWishlist) {
        wishlistDispatch(moveWishlist({ param: product.id })).then(() => {
          toast.success("Bỏ Wishlist thành công!");
          if (wishListState.profile) {
            const updatedWishlist = wishListState.profile.wishlist.filter((id) => id !== product.id);
            dispatch(addProductToWishlist(updatedWishlist));
          }
        });
      } else {
        wishlistDispatch(addWishList({ param: product.id })).then(() => {
          toast.success("Thêm vào Wishlist thành công!");
          if (wishListState.profile) {
            const updatedWishlist = [...wishListState.profile.wishlist, product.id];
            dispatch(addProductToWishlist(updatedWishlist));
          }
        });
      }
    }
  };
  const isInWishlist = wishListState.profile?.wishlist.some((id) => id === product.id);

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
            isDisabled={!selectedSize || !selectedColor || cartState.status === EFetchStatus.PENDING || !wishListState.isLogin}
            icon={<FaShoppingCart className="mr-2" />}
            onClick={handleAddCart}
            className="grow"
            text="Thêm sản phẩm vào giỏ hàng"
          />

          <Button
            shape="rectangle"
            icon={<BsHeart size={24} className="h-5 w-5" />}
            type="button"
            variant={isInWishlist ? "danger" : "secondary"}
            onClick={handleWishlistToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
