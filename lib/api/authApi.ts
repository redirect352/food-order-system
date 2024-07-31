import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CookieService } from '@/shared/services';

export const authApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth',
    prepareHeaders: (headers) => {
      const token = CookieService.getCurrentUser()?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, login, password }) => ({
        url: '/sign-in',
        method: 'POST',
        body: { email, login, password },
      }),
      transformErrorResponse: (errorResponse) => errorResponse.data,
    }),
    checkFirstAuthToken: builder.query({
      query: (params : { token : string }) => ({
        url: '/check-first-auth-token',
        params,
      }),
    }),
    changeCredentials: builder.mutation({
      query: (({ token, ...body }: { token : string, newLogin : string, newPassword: string }) => ({
        url: '/change-credentials',
        method: 'PATCH',
        params: { token },
        body,
      })),
    }),
  }),
});

export const {
  useSignInMutation,
  useLazyCheckFirstAuthTokenQuery,
  useChangeCredentialsMutation,
} = authApi;
