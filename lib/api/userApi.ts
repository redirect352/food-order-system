import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';
import { baseApiWithAuth, baseQueryWithExpire } from './baseApi';

export const userApi = baseApiWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getOwnInfo: builder.query({
      query: () => ({
        url: '/user',
      }),
    }),
}) });

export const { useGetOwnInfoQuery } = userApi;
