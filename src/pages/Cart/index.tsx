import CartTable from "@/components/cart/CartTable";
import CartTotal from "@/components/cart/CartTotal";
import RemoveAllItemButton from "@/components/cart/RemoveAllItem";
import Title from "@/components/common/Title";
import { Container } from "@/styles/common-styles";

const CartPage = () => {
  return (
    <Container className="space-y-10 py-20">
      <Title text="Giỏ hàng" className="md:text-4xl" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 w-full lg:col-span-2">
          <CartTable />
          <div className="mt-6 flex justify-end">
            <RemoveAllItemButton />
          </div>
        </div>
        <div className="col-span-1 md:col-span-1">
          <CartTotal />
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
