// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
// import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLogout } from '../features/user/userSlice';
import { ErrorDto } from '@/shared/types';
import { getToken, handleRefresh } from '../../shared/actions/cookie-actions';

type MaybePromise<T> = T | PromiseLike<T>;
export const baseQueryWithExpire = (baseQuery: { (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}): MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>; (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}): MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>; (arg0: any, arg1: any, arg2: any): any; }) => async (args: any, api: { dispatch: (arg0: { payload: undefined; type: 'user/startLogout'; }) => void; }, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error &&
    (result.error.status === 401 || result.error.data.statusCode === 401)) {
      const newToken = await handleRefresh();
      if(newToken){
        const newResult = await baseQuery(args, api, extraOptions);
        if(!newResult.error) return newResult;
      }
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

export const baseApiWithAuth = createApi({
  reducerPath: 'baseApiWithAuth',
  baseQuery: baseQueryWithExpire(fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}`,
    prepareHeaders: async (headers) => {
      const { token } = await getToken();
      if(!token){
        const newToken = await handleRefresh();
        if(newToken)
          headers.set('Authorization', `Bearer ${newToken}`);
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  })),
  endpoints: (builder) => ({

  }),
});

export const transformFileResponse = async (
  response : any, meta: FetchBaseQueryMeta | undefined, 
  args: any, defaultFilename : string,
) => {
  const contentDisposition = meta?.response?.headers.get('Content-Disposition');
  const filename = contentDisposition?.slice(contentDisposition.indexOf('=') + 1)
  let anchor = document.createElement("a");
  document.body.appendChild(anchor);			
  let objectUrl = window.URL.createObjectURL(response);
  anchor.href = objectUrl;
  anchor.download = filename ?? defaultFilename;
  anchor.click();
  window.URL.revokeObjectURL(objectUrl);
  document.body.removeChild(anchor);
  return { status : 200 };
};