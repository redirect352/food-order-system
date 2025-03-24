import { baseApiWithAuth, transformErrorResponse, transformFileResponse } from "@/lib/api/baseApi";
import { SearchUsersQueryParams, UpdateUserPasswordParams, UpdateUserQueryParams } from "./types";
import { ResponseWithPagination } from "@/shared/types/menu-position.dto";
import { UserMainInfoDto } from "@/shared/types/user";
import { EmployeeFullInfoDto } from "@/shared/types/employee/employee-full-info.dto";
import { OfficeDto } from "@/shared/types";

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
    }),
    updateUser: builder.mutation<any, UpdateUserQueryParams>({
      query: ({id, body}) => ({
        url:`/user/update/${id}`,
        method: 'PATCH',
        body
      }),
      transformErrorResponse,
    }),
    updateUserPassword: builder.mutation<any, UpdateUserPasswordParams>({
      query: ({id,body}) => ({
        url:`/user/change-password/${id}`,
        method: 'PATCH',
        body
      }),
      transformErrorResponse,
    }),
    searchEmployees : builder.query<ResponseWithPagination<EmployeeFullInfoDto[]>, SearchUsersQueryParams>({
      query: (params) => ({
        url:'/employee/search',
        params,
      }),
      transformErrorResponse,
    }),
    getFullOfficeList: builder.query<OfficeDto[], void>({
      query: () => '/branch-office/all',
      transformErrorResponse,
    }),
  }),
})

export const periodStringFormat = 'YYYY-MM-DD HH:mm';
export const {
  useSearchUsersQuery,
  useGetUserMainInfoQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useSearchEmployeesQuery,
  useGetFullOfficeListQuery,
} = moderatorApi;