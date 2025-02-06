import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';
import { DishCategoryDto, MenuPositionDto } from '@/shared/types';
import { baseApiWithAuth, baseQueryWithExpire } from './baseApi';

export type GetActualMenuQueryParams = {
  page?: number,
  pageSize?: number,
  dishCategoryId?: string,
  productType?: string,
};
export const menuApi = baseApiWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getActualMenu: builder.query({
      query: (params: GetActualMenuQueryParams) => ({
        url: '/menu/actual',
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
        url: '/menu/actual/menu-categories',
      }),
      transformResponse: (res) => res as DishCategoryDto[],
      transformErrorResponse: (error) => error.data,
    }),
}) });

export const { useGetActualMenuQuery, useGetMenuCategoriesQuery } = menuApi;
