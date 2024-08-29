import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CookieService } from '@/shared/services';
import { transformErrorResponse } from './baseApi';

export interface SignUpParams {
  password: string,
  login: string,
  email: string,
  surname: string,
  officeId: string,
  personnelNumber: string,
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/auth`,
    prepareHeaders: async (headers) => {
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
    resetPassword: builder.mutation({
      query: (body: { email?: string, login?: string }) => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (({ token, ...body }: { token : string, newPassword: string }) => ({
        url: '/change-password',
        method: 'PATCH',
        params: { token },
        body,
      })),
    }),
    signUp: builder.mutation<any, SignUpParams>({
      query: (body) => ({
        url: '/sign-up',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
    }),
  }),
});

export const {
  useSignInMutation,
  useLazyCheckFirstAuthTokenQuery,
  useChangeCredentialsMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useSignUpMutation,
} = authApi;
