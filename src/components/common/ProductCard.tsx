import { useState } from "react";
import Button from "./Button";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { useProductModal } from "@/hooks/useProductModal";
import { formatPrice } from "@/utils/curency";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { useArchive } from "@/hooks/useArchive";
import { addWishList, moveWishlist } from "@/services/store/wishlist/wishlist.thunk";
import toast from "react-hot-toast";
import { addProductToWishlist, IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import StarSection from "../product/StarSection";
import { ILabel } from "@/services/store/product/product.model";
import { Badge } from "antd";
export interface IProductCardProps {
  productId?: string;
  slug: string;
  image: string;
  name: string;
  description: string;
  regularPrice: number;
  averageRating: number;
  totalReviews: number;
  sold: number;
  discountPrice?: number;
  label?: ILabel;
  type: "wishlist" | "remove";
  onRemove?: (productId: string) => void;
}
const ProductCard = ({
  image,
  name,
  slug,
  productId,
  regularPrice,
  discountPrice,
  totalReviews,
  sold,
  averageRating,
  type = "wishlist",
  label,
  onRemove,
}: IProductCardProps & { onRemove?: (id: string) => void }) => {
  const [imageSrc, setImageSrc] = useState<string>(image || "src/assets/images/errorbgcategory.jpg");
  const { dispatch: wishlistDispatch, state: wishListState } = useArchive<IAuthInitialState>("auth");
  const dispatch = useDispatch();

  const handleWishlistToggle = async () => {
    if (!wishListState.profile) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào Wishlist!");
      return;
    }

    if (productId) {
      try {
        if (isInWishlist) {
          await wishlistDispatch(moveWishlist({ param: productId })).unwrap();
          toast.success("Bỏ Wishlist thành công!");

          if (wishListState.profile) {
            const updatedWishlist = wishListState.profile.wishlist.filter((id) => id !== productId);
            dispatch(addProductToWishlist(updatedWishlist));
          }
        } else {
          await wishlistDispatch(addWishList({ param: productId })).unwrap();
          toast.success("Thêm vào Wishlist thành công!");

          if (wishListState.profile) {
            const updatedWishlist = [...wishListState.profile.wishlist, productId];
            dispatch(addProductToWishlist(updatedWishlist));
          }
        }
      } catch (error: any) {
        const errorMessage = error.errors?.message || error.message || "Không thể thực hiện thao tác với Wishlist lúc này";

        toast.error(errorMessage);
      }
    }
  };

  const isInWishlist = wishListState.profile?.wishlist.some((id) => id === productId);

  const { onOpen } = useProductModal();

  const handleImageError = () => {
    setImageSrc("src/assets/images/errorbgcategory.jpg");
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(slug);
    }
  };

  return (
    <div className="relative space-y-4">
      <Badge.Ribbon text={label && label.name} placement="start" style={{ color: "#14111C", backgroundColor: "#14111C" }}>
        <div className="group relative overflow-hidden">
          <Link to={`/product/${slug}`}>
            <img src={imageSrc} alt={name} className="aspect-5/6 rounded-t-md object-cover" onError={handleImageError} />
          </Link>
          <div className="absolute -right-20 top-5 transition-all duration-300 ease-in-out group-hover:right-5">
            {type === "wishlist" ? (
              <Button
                shape="rounded"
                icon={<CiHeart size={24} />}
                type="button"
                variant={isInWishlist ? "danger" : "default"}
                onClick={handleWishlistToggle}
                className={clsx("transition-transform duration-300 ease-in-out hover:scale-110")}
              />
            ) : (
              <Button
                shape="rounded"
                icon={<HiOutlineTrash size={24} />}
                type="button"
                variant="danger"
                onClick={handleRemove}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            )}
          </div>
          <div className="absolute -bottom-20 left-1/2 flex w-full -translate-x-1/2 justify-center transition-all group-hover:bottom-3">
            <Button
              icon={<BsCartCheck className="mr-2 h-5 w-5" />}
              onClick={() => onOpen(slug)}
              className="w-3/4 text-nowrap font-medium"
              text="Thêm vào giỏ hàng"
              variant="default"
            />
          </div>
        </div>
      </Badge.Ribbon>
      <div className="space-y-2">
        <p className="text-nowrap text-xs">{sold} lượt bán</p>
        <Link to={`/product/${slug}`} className="line-clamp-1 font-bold">
          {name}
        </Link>
        <StarSection averageRating={averageRating} totalReviews={totalReviews} />
        <div className="flex items-center space-x-2 font-semibold">
          {discountPrice ? (
            <div className="flex flex-wrap gap-2">
              <span className="text-nowrap text-sm text-primary-500 md:text-base">{formatPrice(discountPrice)}</span>
              <span className="text-nowrap text-sm text-primary-400 line-through md:text-base">{formatPrice(regularPrice)}</span>
            </div>
          ) : (
            <span className="text-primary-500">{formatPrice(regularPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
