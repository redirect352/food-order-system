import { baseApiWithAuth, transformErrorResponse, transformFileResponse } from "@/lib/api/baseApi";
import { SearchUsersQueryParams } from "./types";
import { ResponseWithPagination } from "@/shared/types/menu-position.dto";
import { UserMainInfoDto } from "../../../shared/types/user";

export const moderatorApi = baseApiWithAuth.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) =>({
    searchUsers : builder.query<ResponseWithPagination<number[]>, SearchUsersQueryParams>({
      query: (params) => ({
        url:'/user/search',
        params,
      }),
      transformErrorResponse,
    }),
    getUserMainInfo: builder.query<UserMainInfoDto, number>({
      query: (id) => ({
        url:`/user/main-info/${id}`,
      }),
      transformErrorResponse,
    })
  }),
})

export const periodStringFormat = 'YYYY-MM-DD HH:mm';
export const {
  useSearchUsersQuery,
  useGetUserMainInfoQuery,
} = moderatorApi;