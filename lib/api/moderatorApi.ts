import { baseApiWithAuth, baseQueryWithExpire, transformErrorResponse, transformFileResponse } from "./baseApi";
import { ImageDto, OfficeDto } from "../../shared/types";
import dayjs from "dayjs";
import { ImageTagDto } from "../../shared/types/image-tag.dto";

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
            bodyFormData.append(key, value?.toString());
        }        
        return ({
          method: "POST",
          url:'/image/upload',
          body: bodyFormData,
          formData:true,
        })
      },
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
  }),
})

type CreateMenuFromDocxDto = {
  file: Blob,
  providingCanteenId: string,
  servedOffices: string[],
  name?: string,
  relevantFrom: dayjs.Dayjs | null,
  expire:  dayjs.Dayjs | null,
}
type SearchImageTagDto = {
  searchString?: string,
  page?: number,
  pageSize?: number,
}

type UploadImagesDto = {
  files: File[],
  tags: string[],
  name?: string,
}

type ExportOrdersDocxDto = {
  periodStart: string,
  periodEnd: string,
}

export const periodStringFormat = 'YYYY-MM-DD HH:mm';
export const {
  useGetCanteenListQuery,
  useUploadWordMenuMutation,
  useSearchImageTagsQuery,
  useUploadImagesMutation,
  useLazyOrderExportDocxQuery,
} = moderatorApi;