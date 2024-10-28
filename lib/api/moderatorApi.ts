import { baseApiWithAuth, baseQueryWithExpire, transformErrorResponse } from "./baseApi";
import { OfficeDto } from "../../shared/types";
import { url } from "inspector";
import dayjs from "dayjs";
import { File } from "buffer";
import { blob } from "stream/consumers";

type CreateMenuFromDocxDto = {
  file: Blob,
  providingCanteenId: string,
  servedOffices: string[],
  name?: string,
  relevantFrom: dayjs.Dayjs | null,
  expire:  dayjs.Dayjs | null,
}

export const moderatorApi = baseApiWithAuth.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) =>({
    getCanteenList: builder.query<OfficeDto[], void>({
      
      query: () => '/branch-office/canteen-list',
      transformErrorResponse,
    }),
    uploadWordMenu: builder.mutation<{menu: any}, CreateMenuFromDocxDto>({
      query: ({file,...body}) => {
        var bodyFormData = new FormData();
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
  }),
})

export const {
  useGetCanteenListQuery,
  useUploadWordMenuMutation,
} = moderatorApi;