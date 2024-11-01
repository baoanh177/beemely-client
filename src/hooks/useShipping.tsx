import { useEffect, useState } from "react";
import { useArchive } from "@/hooks/useArchive";
import { client } from "@/services/config/client";
import { ICartInitialState } from "@/services/store/cart/cart.slice";
import { IDimensions } from "@/services/store/product/product.model";

export interface IShippingFeeResponse {
  shippingFee: number;
}

export interface IShippingItem {
  dimensions: IDimensions;
  quantity: number;
}

interface IUseShippingFeeReturn {
  shippingFee: number | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useShippingFee = (): IUseShippingFeeReturn => {
  const { state } = useArchive<ICartInitialState>("cart");
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const formatShippingPayload = (): IShippingItem[] => {
    const cartItems = state?.cart?.cartItems || [];
    return cartItems.map((item) => ({
      dimensions: item.product.dimensions,
      quantity: item.quantity,
    }));
  };

  const calculateShippingFee = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedItems = formatShippingPayload();

      if (formattedItems.length === 0) {
        setShippingFee(0);
        return;
      }

      const { data } = await client.post<IShippingFeeResponse>("/api/client/shipping/shipping-fee", {
        body: {
          items: formattedItems,
        },
      });

      setShippingFee(data.metaData.shippingFee);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to calculate shipping fee"));
      setShippingFee(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateShippingFee();
  }, [state.cart?.cartItems]);

  return {
    shippingFee,
    isLoading,
    error,
    refetch: calculateShippingFee,
  };
};
