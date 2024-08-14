import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';
import { DishCategoryDto, MenuPositionDto } from '@/shared/types';

export type GetActualMenuQueryParams = {
  page?: number,
  pageSize?: number,
  dishCategoryId?: string,
  productType?: string,
};

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/menu`,
    prepareHeaders: async (headers) => {
      const { token } = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getActualMenu: builder.query({
      query: (params: GetActualMenuQueryParams) => ({
        url: '/actual',
        params: {
          ...params,
        },
      }),
      transformResponse: (res) => res as {
        items: MenuPositionDto[],
        totalPages: number
      },
    }),
    getMenuCategories: builder.query({
      query: () => ({
        url: '/actual/menu-categories',
      }),
      transformResponse: (res) => res as DishCategoryDto[],
    }),
}) });

export const { useGetActualMenuQuery, useGetMenuCategoriesQuery } = menuApi;
