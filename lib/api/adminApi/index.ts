import { baseApiWithAuth, transformErrorResponse, transformFileResponse } from "@/lib/api/baseApi";
import { GetOfficeFullInfoListParams, SearchUsersQueryParams, UpdateBranchOfficeBody, UpdateUserPasswordParams, UpdateUserQueryParams } from "./types";
import { ResponseWithPagination } from "@/shared/types/menu-position.dto";
import { UserMainInfoDto } from "@/shared/types/user";
import { EmployeeFullInfoDto } from "@/shared/types/employee/employee-full-info.dto";
import { OfficeDto, OfficeFullInfoDto } from "@/shared/types";

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
    getOfficeFullInfoList: builder.query<ResponseWithPagination<OfficeFullInfoDto[]>, GetOfficeFullInfoListParams>({
      query: (params) => ({
        url: '/branch-office/all/full-info',
        params
      }),
      providesTags:['BranchOfficeFullInfo']
    }),
    updateBranchOffice: builder.mutation<any, UpdateBranchOfficeBody>({
      query: (body) => ({
        url:`/branch-office/update`,
        method: 'PATCH',
        body
      }),
      transformErrorResponse,
      invalidatesTags: ['BranchOfficeFullInfo']
    }),
    deleteBranchOffice: builder.mutation<any, number>({
      query: (id) => ({
        url:`/branch-office/delete/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse,
      invalidatesTags: ['BranchOfficeFullInfo']
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
  useGetOfficeFullInfoListQuery,
  useUpdateBranchOfficeMutation,
  useDeleteBranchOfficeMutation,
} = moderatorApi;