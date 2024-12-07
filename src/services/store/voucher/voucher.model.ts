export interface IVoucher {
  id: string;
  name: string;
  code: string;
  maxUsage: number;
  maxReduce: number;
  discount: number;
  status: number;
  discountTypes: IDiscountType;
  minimumOrderPrice: number;
  voucherType: IVoucherType;
  endDate: Date;
  startDate: Date;
}

export type IDiscountType = "percentage" | "fixed";
export type IVoucherType = "DEADLINE" | "FREE_SHIPPING" | "PERIOD";
