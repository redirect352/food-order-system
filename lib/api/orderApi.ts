import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithExpire, transformErrorResponse } from './baseApi';
import { OrderFullInfoDto, OrderMainInfoDto } from '@/shared/types';

export type MakeOrderParams = {
  menuPositions: number[],
  counts: number[],
  deliveryDestinationId: number,
};
export type GetActiveOrdersParams = {
  page?: number,
  pageSize?: number,
  active: boolean
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['ActiveOrdersList'],
  baseQuery: baseQueryWithExpire,
  endpoints: (builder) => ({
    makeOrder: builder.mutation(({
      query: (body: MakeOrderParams) => ({
        url: 'order/create',
        body,
        method: 'POST',
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, args) => {
        if (!error) return ['ActiveOrdersList'];
        return [];
      },
    })),
    getOrdersList: builder.query({
      query: (params:GetActiveOrdersParams) => ({
        url: 'order/list',
        params,
      }),
      transformResponse: (res) => res as {
        items: OrderMainInfoDto[],
        totalPages: number
      },
      transformErrorResponse,
      providesTags: ['ActiveOrdersList'],
    }),
    getOrderInfo: builder.query({
      query: (params: { issued: string, number: number }) => ({
        url: `order/${params.issued}/${params.number}`,
        params,
      }),
      transformResponse: (res) => res as OrderFullInfoDto,
      transformErrorResponse,
    }),
    cancelOrder: builder.mutation({
      query: (params: { issued: string, number: number }) => ({
        url: `order/cancel/${params.issued}/${params.number}`,
        params,
        method: 'DELETE',
      }),
      transformResponse: (res) => res,
      transformErrorResponse,
      invalidatesTags: (result, error, args) => {
        if (!error) return ['ActiveOrdersList'];
        return [];
      },
    }),
    getOrdersTotal: builder.query({
      query: (params: { periodStart?: string, periodEnd?: string }) => ({
        url: 'order/total/',
        params,
      }),
      providesTags: ['ActiveOrdersList'],
      transformResponse: (res) => res as { totalCount: number, totalPrice:number },
      transformErrorResponse,
    }),
}) });

export const {
  useMakeOrderMutation,
  useGetOrdersListQuery,
  useGetOrderInfoQuery,
  useLazyGetOrderInfoQuery,
  useCancelOrderMutation,
  useGetOrdersTotalQuery,
} = orderApi;
