import qs from "qs";
import { baseQuery } from "@/services/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductQueryParams } from "./product.model";
import { IResponse } from "@/shared/utils/shared-interfaces";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<IResponse<IProduct[]>, IProductQueryParams>({
      query: (params) => {
        const queryString = qs.stringify(params, { skipNulls: true });
        return `/api/client/product?${queryString}`;
      },
    }),
    getProductDetail: builder.query<IResponse<IProduct>, { id: string }>({
      query: ({ id }) => `/api/client/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi;
