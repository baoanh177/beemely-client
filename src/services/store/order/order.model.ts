import { EStatusOrder } from "@/shared/enums/order";
import { IProduct, IVariant } from "../product/product.model";

export interface IOrder {
    id: string;
    user: unknown;
    items: IOrderItem[];
    orderStatus:  EStatusOrder;

}

export interface IOrderItem {
    id: string;
    product: IProduct;
    quantity: number;
    price: number;
    variant: IVariant;
}

