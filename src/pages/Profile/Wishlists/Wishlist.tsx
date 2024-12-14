import ProductCard from "@/components/common/ProductCard";
import { useArchive } from "@/hooks/useArchive";
import { IWishListInitialState } from "@/services/store/wishlist/wishlist.slice";
import { deleteWishlist, getAllWishList } from "@/services/store/wishlist/wishlist.thunk";
import { Empty } from "antd";
import { useEffect } from "react";

const Wishlist = () => {
  const { state, dispatch } = useArchive<IWishListInitialState>("wishlist");

  useEffect(() => {
    dispatch(getAllWishList({}));
  }, [dispatch]);

  const handleRemove = (productId: string) => {
    dispatch(deleteWishlist({ param: productId }));
  };

  const products = Array.isArray(state.products) ? state.products : [];

  return (
    <div className="flex w-full flex-wrap gap-4 lg:gap-8">
      {products.length ? (
        products.map((p) => (
          <div className="w-[calc((100%-16px)/2)] lg:w-[calc((100%-64px)/3)]" key={p.id}>
            <ProductCard
              label={p.labels[0]}
              sold={p.sold || 0}
              averageRating={p.averageRating || 0}
              totalReviews={p.totalReviews || 0}
              slug={p.slug}
              productId={p.id}
              image={p.thumbnail}
              description={p.sortDescription}
              type="remove"
              name={p.name}
              regularPrice={p.variants[0]?.price}
              discountPrice={p.variants[0]?.discountPrice}
              onRemove={() => handleRemove(p.id)}
            />
          </div>
        ))
      ) : (
        <div className="flex w-full items-center justify-center">
          <Empty description={<span className="font-semibold">Chưa có sản phẩm yêu thích</span>} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
