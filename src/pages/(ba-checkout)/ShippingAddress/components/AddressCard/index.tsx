import { Button, Checkbox } from "antd";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoTrashBinOutline } from "react-icons/io5";
import { Address, ButtonWrapper, JustifyBetween, Receiver, Wrapper } from "./address-card.style";

const AddressCard = () => {
  return (
    <>
      <Wrapper>
        <JustifyBetween>
          <Receiver>Robert Fox</Receiver>
          <Checkbox />
        </JustifyBetween>
        <Address>4517 Washington Ave. Manchester, Kentucky 39495</Address>
        <ButtonWrapper>
          <Button color="default" variant="filled" icon={<HiOutlinePencilSquare />}>
            Chỉnh Sửa
          </Button>
          <Button color="danger" variant="filled" icon={<IoTrashBinOutline />}>
            Xóa
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default AddressCard;
