import { Table } from "antd";
import CartEmpty from "./CartEmpty";
import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { deleteCartItem, updateCartItem } from "@/services/store/cart/cart.thunk";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatPrice } from "@/utils/curency";
import QuantityInput from "../common/QuantityInput";
import Button from "../common/Button";
import CartProduct from "./CartProduct";

const CartTable = () => {
  const { state, dispatch } = useArchive<ICartInitialState>("cart");
  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteCartItem({ param: itemId }));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    dispatch(
      updateCartItem({
        body: {
          quantity: newQuantity,
        },
        param: itemId,
      }),
    );
  };

  const cartItems = state.cart?.cartItems ?? [];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text: number) => formatPrice(text),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: any) => (
        <QuantityInput max={record.maxQuantity} value={text} onChange={(newQuantity) => handleQuantityChange(record.key, newQuantity)} />
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => formatPrice(text),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (record: any) => <Button icon={<HiOutlineTrash size={20} />} onClick={() => handleRemoveItem(record)} variant="danger" />,
    },
  ];

  const data = cartItems.map((item) => ({
    key: item.id,
    image: item.product.thumbnail,
    product: <CartProduct item={item} showPrice={false} />,
    unitPrice: item.variant.discountPrice ? item.variant.discountPrice : item.variant.price,
    quantity: item.quantity,
    totalPrice: item?.variant?.discountPrice ? item?.variant?.discountPrice * item.quantity : item?.variant?.price * item.quantity,
    action: item.id,
    maxQuantity: item.variant.stock,
  }));

  const content =
    cartItems.length > 0 ? (
      <Table rowHoverable={false} columns={columns} dataSource={data} pagination={false} />
    ) : (
      <CartEmpty className="w-full" />
    );

  return <>{content}</>;
};

export default CartTable;
