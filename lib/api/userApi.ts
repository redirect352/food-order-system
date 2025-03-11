import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';
import { baseApiWithAuth, baseQueryWithExpire } from './baseApi';
import { UserOwnInfoDto } from '@/shared/types/user';

export const userApi = baseApiWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getOwnInfo: builder.query<UserOwnInfoDto, undefined>({
      query: () => ({
        url: '/user',
      }),
    }),
}) });

export const { useGetOwnInfoQuery } = userApi;
