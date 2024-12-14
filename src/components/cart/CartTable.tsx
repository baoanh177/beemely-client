import { message, Table } from "antd";
import CartEmpty from "./CartEmpty";
import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { deleteCartItem, updateCartItem } from "@/services/store/cart/cart.thunk";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatPrice } from "@/utils/curency";
import QuantityInput from "../common/QuantityInput";
import Button from "../common/Button";
import CartProduct from "./CartProduct";
import { IVariant } from "@/services/store/product/product.model";
import { EActiveStatus } from "@/shared/enums/fetchStatus";

const CartTable = () => {
  const { state, dispatch } = useArchive<ICartInitialState>("cart");
  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteCartItem({ param: itemId }));
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      await dispatch(
        updateCartItem({
          body: {
            quantity: newQuantity,
          },
          param: itemId,
        }),
      ).unwrap();
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.errors.message || "Không thể cập nhật số lượng sản phẩm lúc này";
      message.error(errorMessage);
    }
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
      dataIndex: "variant",
      key: "variant",
      render: (record: IVariant) => {
        return (
          <div className="flex items-center space-x-2 font-semibold">
            {record.discountPrice ? (
              <div className="flex flex-wrap gap-2">
                <span className="text-nowrap text-xs text-primary-500">{formatPrice(record.discountPrice)}</span>
                <span className="text-nowrap text-xs text-primary-400 line-through">{formatPrice(record.price)}</span>
              </div>
            ) : (
              <span className="text-xs text-primary-500">{formatPrice(record.price)}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: any) => {
        const isOutStock = record.variant.stock === 0;
        const isInactivedProduct = record.productData.status === EActiveStatus.INACTIVE;

        if (isInactivedProduct || isOutStock) {
          return null;
        } else {
          return (
            <QuantityInput max={record.maxQuantity} value={text} onChange={(newQuantity) => handleQuantityChange(record.key, newQuantity)} />
          );
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => <p className="text-nowrap text-xs font-semibold text-primary-600">{formatPrice(text)}</p>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (record: any) => <Button icon={<HiOutlineTrash size={20} />} onClick={() => handleRemoveItem(record)} variant="danger" />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: any) => {
        const isOutStock = record.variant.stock === 0;
        const isInactivedProduct = record.productData.status === EActiveStatus.INACTIVE;
        console.log(record);

        if (isInactivedProduct || isOutStock) {
          return <p className="text-nowrap rounded-3xl bg-red-100 px-3 py-1 text-xs text-red-500">Hết hàng</p>;
        } else {
          return <p className="text-nowrap rounded-3xl bg-green-100 px-3 py-1 text-xs text-green-600">Còn hàng</p>;
        }
      },
    },
  ];

  const data = cartItems.map((item) => ({
    key: item.id,
    variant: item.variant,
    image: item.product.thumbnail,
    productData: item.product,
    product: <CartProduct item={item} showPrice={false} />,
    unitPrice: item.variant.price,
    discountPrice: item.variant.discountPrice,
    quantity: item.quantity,
    totalPrice: item?.variant?.discountPrice ? item?.variant?.discountPrice * item.quantity : item?.variant?.price * item.quantity,
    action: item.id,
    maxQuantity: item.variant.stock,
    status: item.variant.stock === 0 ? "Hết hàng" : "Còn hàng",
  }));

  const content =
    cartItems.length > 0 ? (
      <Table
        rowClassName={(record) => (record.variant.stock === 0 ? "bg-red-50" : "")}
        rowHoverable={false}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    ) : (
      <CartEmpty className="w-full" />
    );

  return <>{content}</>;
};

export default CartTable;
