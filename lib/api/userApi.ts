import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/shared/actions/cookie-actions';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/user`,
    prepareHeaders: async (headers) => {
      const { token } = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getOwnInfo: builder.query({
      query: () => ({
        url: '/',
      }),
    }),

}) });

export const { useGetOwnInfoQuery } = userApi;
