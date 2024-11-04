import { Input } from "antd";
import tw from "twin.macro";

export const PriceCardWrapper = tw.div`flex flex-col gap-4 rounded-lg border border-gray-500 p-5`;

export const PriceRow = tw.div`flex justify-between font-bold`;

export const DiscountInput = tw(Input)`h-[52px] border-primary-600 px-3`;

export const Divide = tw.div`border-t border-gray-20%`;

export const JustifyBetween = tw.div`flex justify-between`;
export const FlexCol = tw.div`flex flex-col`;
