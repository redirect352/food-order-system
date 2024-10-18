import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';
import { baseQueryWithExpire, transformErrorResponse } from './baseApi';
import { OrderFullInfoDto, OrderMainInfoDto } from '@/shared/types';

export type MakeOrderParams = {
  menuPositions: number[],
  counts: number[],
};
export type GetActiveOrdersParams = {
  page?: number,
  pageSize?: number,
  active: boolean
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['ActiveOrdersList'],
  baseQuery: baseQueryWithExpire(fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/order`,
    prepareHeaders: async (headers) => {
      const { token } = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  })),
  endpoints: (builder) => ({
    makeOrder: builder.mutation(({
      query: (body: MakeOrderParams) => ({
        url: '/create',
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
        url: '/list',
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
        url: `/${params.issued}/${params.number}`,
        params,
      }),
      transformResponse: (res) => res as OrderFullInfoDto,
      transformErrorResponse,
    }),
    cancelOrder: builder.mutation({
      query: (params: { issued: string, number: number }) => ({
        url: `/cancel/${params.issued}/${params.number}`,
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
        url: '/total/',
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
