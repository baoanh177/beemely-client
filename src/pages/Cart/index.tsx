import CartTable from "@/components/cart/CartTable";
import Title from "@/components/common/Title";
import { Container } from "@/styles/common-styles";

const CartPage = () => {
  return (
    <Container className="space-y-10 py-20">
      <Title text="Giỏ hàng" className="md:text-4xl" />
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="col-span-full md:col-span-2">
          <CartTable />
        </div>
        <div className="col-span-full md:col-span-1"></div>
      </div>
    </Container>
  );
};

export default CartPage;
