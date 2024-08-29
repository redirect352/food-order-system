import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLogout } from '../features/user/userSlice';
import { ErrorDto } from '@/shared/types';

export const baseQueryWithExpire = (baseQuery: { (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}): MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>; (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}): MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>; (arg0: any, arg1: any, arg2: any): any; }) => async (args: any, api: { dispatch: (arg0: { payload: undefined; type: 'user/startLogout'; }) => void; }, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error &&
    (result.error.status === 401 || result.error.data.statusCode === 401)) {
      api.dispatch(startLogout());
  }
  return result;
};

export const transformErrorResponse = (response : any) => response.data as ErrorDto;

export const baseApiWithoutAuth = createApi({
  reducerPath: 'baseApiNoToken',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}`,
  }),
  endpoints: (builder) => ({

  }),
});
