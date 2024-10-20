import Title from "../common/Title";
import tw from "twin.macro";

interface CartEmptyProps {
  className?: string;
}

const Wrapper = tw.div`flex flex-col items-center gap-8 p-10`;

const CartEmpty = ({ className }: CartEmptyProps) => {
  return (
    <Wrapper className={className}>
      <Title className="text-sm font-medium" text="Không có sản phẩm nào trong giỏ hàng của bạn!" />
    </Wrapper>
  );
};

export default CartEmpty;
