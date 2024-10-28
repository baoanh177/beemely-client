import ProductCard from "@/components/common/ProductCard"
import { useArchive } from "@/hooks/useArchive"
import { IWishListInitialState } from "@/services/store/wishlist/wishlist.slice"
import { deleteWishlist, getAllWishList } from "@/services/store/wishlist/wishlist.thunk"
import { useEffect } from "react"

const Wishlist = () => {
    const { state, dispatch } = useArchive<IWishListInitialState>('wishlist')

    useEffect(() => {
        dispatch(getAllWishList({}))
    }, [dispatch])

    const handleRemove = (productId: string) => {
        dispatch(deleteWishlist({ param: productId }));
    };

    return (
        <div className="flex w-full gap-8 flex-wrap">
            {state.products.map((p) => (
                <div className="w-[calc((100%-64px)/3)]" key={p.id}>
                    <ProductCard
                        productId={p.id}
                        image={p.thumbnail}
                        description={p.description}
                        type="remove"
                        name={p.name}
                        regularPrice={p.variants[0]?.price}
                        discountPrice={p.variants[0]?.discountPrice}
                        onRemove={handleRemove}
                    />
                </div>
            ))}
        </div>
    );
}

export default Wishlist;
