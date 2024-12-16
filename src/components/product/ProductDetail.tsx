import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

import { useArchive } from "@/hooks/useArchive";
import { addToCart } from "@/services/store/cart/cart.thunk";
import { IProduct, IProductColor, IVariant } from "@/services/store/product/product.model";
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
import { message } from "antd";

interface ProductDetailsProps {
  product: IProduct;
  selectedVariant: IVariant | null;
  sortVariant: IVariant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<IVariant | null>>;
}

const ProductDetails = ({ product, selectedVariant, setSelectedVariant, sortVariant }: ProductDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [productColors, setProductColors] = useState<IProductColor[]>(product.productColors);

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

  const productSizes = product.variants.map((v) => v.size).filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));

  const sizeColorMap = product.variants.reduce((acc: Record<string, { colors: string[] }>, variant: IVariant) => {
    const { color, size } = variant;
    if (!acc[size.id]) {
      acc[size.id] = { colors: [] };
    }
    if (!acc[size.id].colors.some((c) => c === color.id)) {
      acc[size.id].colors.push(color.id);
    }
    return acc;
  }, {});

  useEffect(() => {
    if (selectedSize) {
      const { colors } = sizeColorMap[selectedSize];
      const tempColors = product.productColors.filter((item) => colors.includes(item.colorId.id));
      setProductColors(tempColors);
    }
  }, [selectedSize]);

  const handleWishlistToggle = async () => {
    if (!wishListState.profile) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào Wishlist!");
      return;
    }

    if (product.id) {
      try {
        if (isInWishlist) {
          await wishlistDispatch(moveWishlist({ param: product.id })).unwrap();
          toast.success("Bỏ Wishlist thành công!");

          if (wishListState.profile) {
            const updatedWishlist = wishListState.profile.wishlist.filter((id) => id !== product.id);
            dispatch(addProductToWishlist(updatedWishlist));
          }
        } else {
          await wishlistDispatch(addWishList({ param: product.id })).unwrap();
          toast.success("Thêm vào Wishlist thành công!");

          if (wishListState.profile) {
            const updatedWishlist = [...wishListState.profile.wishlist, product.id];
            dispatch(addProductToWishlist(updatedWishlist));
          }
        }
      } catch (error: any) {
        const errorMessage = error.errors?.message || error.message || "Không thể thực hiện thao tác với Wishlist lúc này";

        toast.error(errorMessage);
      }
    }
  };
  const isInWishlist = wishListState.profile?.wishlist.some((id) => id === product.id);

  const handleAddCart = () => {
    if (!wishListState.isLogin) {
      message.error("Bạn phải đăng nhập mới có thể thêm sản phẩm vào giỏ hàng!");
      return;
    }
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
        <h2 className="text-sm font-medium capitalize text-primary-80%">{product?.gender?.name}</h2>
      </div>

      <StarSection totalReviews={product.totalReviews || 0} averageRating={product.averageRating || 0} />

      <PriceSection
        regularPrice={selectedVariant?.price || sortVariant.price}
        discountPrice={selectedVariant?.discountPrice || sortVariant.discountPrice}
      />

      <DescriptionSection content={product.sortDescription} />

      <SizeSelectSection sizes={productSizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

      <ColorSelectSection isDisable={!selectedSize} colors={productColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      {selectedVariant && <StockSection stock={selectedVariant.stock} />}

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <p>Số lượng:</p>
          <QuantityInput value={quantity} onChange={setQuantity} max={selectedVariant?.stock || sortVariant.stock} />
        </div>
        <div className="flex w-full gap-4">
          <Button
            isDisabled={!selectedSize || !selectedColor || cartState.status === EFetchStatus.PENDING || selectedVariant?.stock === 0}
            icon={<FaShoppingCart className="mr-2" />}
            isLoading={cartState.status === EFetchStatus.PENDING}
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
