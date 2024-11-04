import { Button, Space } from "antd";
import { DiscountInput, Divide, FlexCol, JustifyBetween, PriceCardWrapper, PriceRow } from "./price-card.style";
import "twin.macro";

const PriceCard = () => {
  return (
    <>
      <PriceCardWrapper>
        <PriceRow>
          <div>Tổng tiền hàng</div>
          <div>$200.00</div>
        </PriceRow>
        <Divide />
        <FlexCol tw="gap-4">
          <FlexCol>
            <label>Nhập mã giảm giá</label>
            <Space.Compact>
              <DiscountInput />
              <Button size="large" variant="solid" color="default" className="h-[52px] px-7">
                Áp Dụng
              </Button>
            </Space.Compact>
          </FlexCol>
          <JustifyBetween>
            <span>Phí vận chuyển</span>
            <span>$5.00</span>
          </JustifyBetween>
        </FlexCol>
        <Divide />
        <PriceRow>
          <div>Tổng thanh toán</div>
          <div>$205.00</div>
        </PriceRow>
      </PriceCardWrapper>
    </>
  );
};

export default PriceCard;
