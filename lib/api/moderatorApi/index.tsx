import { baseApiWithAuth, transformErrorResponse, transformFileResponse } from "../baseApi";
import { ImageDto, ImageTagDto, MenuInfoDto, MenuListDto, OfficeDto } from "@/shared/types";
import { CreateMenuFromDocxDto, SearchImageTagDto, UploadImagesDto, ExportOrdersDocxDto, GetMenuListParams, SearchOrdersParams, SearchOrderItemDto, UpdateMenuParams, SearchImageParams, UpdateImageTagsParams, DeleteImagesParams, } from "./types";
import { ResponseWithPagination } from "@/shared/types";
import { ImageFullInfoDto } from "@/shared/types/image/image-full-info.dto";

export const moderatorApi = baseApiWithAuth.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) =>({
    getCanteenList: builder.query<OfficeDto[], void>({
      query: () => '/branch-office/canteen-list',
      transformErrorResponse,
    }),
    uploadWordMenu: builder.mutation<{menu: any}, CreateMenuFromDocxDto>({
      query: ({file,...body}) => {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        for(let [key, value] of Object.entries(body)){
          if(!!value)
            bodyFormData.append(key, value?.toString());
        }        
        return ({
          method: "POST",
          url:'/menu/create/from-file/word',
          body: bodyFormData ,
          formData:true,
        })
      },
      transformErrorResponse,
    }),
    searchImageTags: builder.query<ImageTagDto[], SearchImageTagDto>({
      query: (params) => ({
        url: '/image-tag/search',
        params,
      }),
      transformErrorResponse,
    }),
    uploadImages: builder.mutation<Array<ImageDto>, UploadImagesDto>({
      query: ({files,...body}) => {
        const bodyFormData = new FormData();
        files.forEach((file) => bodyFormData.append('files', file as Blob));
        for(let [key, value] of Object.entries(body)){
          if(!!value)
            bodyFormData.append(key, JSON.stringify(value));
        }        
        return ({
          method: "POST",
          url:'/image/upload',
          body: bodyFormData,
          formData:true,
        })
      },
      invalidatesTags:['Images'],
      transformErrorResponse,
    }),
    orderExportDocx:  builder.query<any, ExportOrdersDocxDto>({
      query: (params) => ({
        url:'/order/actual/export-list/docx',
        params,
        responseHandler : (res : Response) => res.status === 200 ? res.blob() :res.json(),
      }),
      transformResponse: (response, meta, args) =>
        transformFileResponse(response, meta as any, args, 'default.docx'),
      transformErrorResponse,
    }),
    getMenuList : builder.query<MenuListDto, GetMenuListParams>({
      query: (params) => ({
        url:'/menu/list',
        params,
      }),
      providesTags: ['MenuList'],
      transformErrorResponse,
    }),
    getMenuById : builder.query<MenuInfoDto, {id: number}>({
      query: ({id}) => ({
        url:`/menu/${id}`,
      }),
      transformErrorResponse,
    }),
    searchOrders: builder.query<ResponseWithPagination<SearchOrderItemDto[]>, SearchOrdersParams>({
      query: (params) => ({
        url:`/order/search`,
        params,
      }),
      transformErrorResponse,
    }),
    updateMenu: builder.mutation<any, UpdateMenuParams>({
      query: ({id,body}) => ({
        url:`/menu/${id}`,
        method: 'PATCH',
        body
      }),
      transformErrorResponse,
    }),
    deleteMenu: builder.mutation<any, {id: number}>({
      query: ({id}) => ({
        url:`/menu/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuList'],
      transformErrorResponse,
    }),
    getImageList: builder.query<ResponseWithPagination<ImageFullInfoDto[]>, SearchImageParams>({
      query: (params) => ({
        url:`/image/list`,
        params,
      }),
      providesTags:['Images'],
      transformErrorResponse,
    }),
    updateImageTags: builder.mutation<any, UpdateImageTagsParams>({
      query: ({id,body}) => ({
        url:`/image/${id}/update/tags`,
        method: 'PATCH',
        body
      }),
      // invalidatesTags:['Images'],
      transformErrorResponse,
    }),
    deleteImages: builder.mutation<any, DeleteImagesParams>({
      query: ({body}) => ({
        url:`/image/delete`,
        method: 'DELETE',
        body
      }),
      invalidatesTags:['Images'],
      transformErrorResponse,
    }),
    deleteImagesTags: builder.mutation<any, DeleteImagesParams>({
      query: ({body}) => ({
        url:`/image/tags/clear`,
        method: 'PATCH',
        body
      }),
      invalidatesTags:['Images'],
      transformErrorResponse,
    }),
  }),
})

export const periodStringFormat = 'YYYY-MM-DD HH:mm';
export const {
  useGetCanteenListQuery,
  useUploadWordMenuMutation,
  useSearchImageTagsQuery,
  useUploadImagesMutation,
  useLazyOrderExportDocxQuery,
  useGetMenuListQuery,
  useLazyGetMenuListQuery,
  useGetMenuByIdQuery,
  useSearchOrdersQuery,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useGetImageListQuery,
  useUpdateImageTagsMutation,
  useDeleteImagesMutation,
  useDeleteImagesTagsMutation,
} = moderatorApi;