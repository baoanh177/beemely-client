import { useArchive } from "@/hooks/useArchive";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { deleteAllCartItem } from "@/services/store/cart/cart.thunk";
import { message } from "antd";
import Button from "../common/Button";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

const RemoveAllItemButton = () => {
  const { state, dispatch } = useArchive<ICartInitialState>("cart");
  const handleRemoveItem = async () => {
    await dispatch(deleteAllCartItem()).then(() => {
      message.success("Đã xóa sản phẩm trong giỏ hàng");
    });
  };

  if (state?.cart?.cartItems.length === 0) {
    return null;
  }

  return <Button isDisabled={state.status === EFetchStatus.PENDING} text="Làm trống giỏ hàng" onClick={handleRemoveItem} variant="secondary" />;
};

export default RemoveAllItemButton;
