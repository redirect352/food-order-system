import { DishCategoryDto, MenuPositionDto, OfficeDto } from '@/shared/types';
import { baseApiWithAuth } from './baseApi';

export type GetActualMenuQueryParams = {
  page?: number,
  pageSize?: number,
  dishCategoryId?: string,
  productType?: string,
  destinationOfficeId: number,
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
    getDeliveryPoints: builder.query({
      query: () => ({
        url: '/branch-office/delivery-points',
      }),
      transformResponse: (res) => res as OfficeDto[],
      transformErrorResponse: (error) => error.data,
    }),
}) });

export const { 
  useGetActualMenuQuery,
  useGetMenuCategoriesQuery,
  useGetDeliveryPointsQuery 
} = menuApi;
