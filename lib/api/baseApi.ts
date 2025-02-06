// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
// import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi, BaseQueryFn, CreateApi, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLogout } from '../features/user/userSlice';
import { ErrorDto } from '@/shared/types';
import { getToken, handleRefresh } from '../../shared/actions/cookie-actions';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}`,     
  prepareHeaders: async (headers) => {
    const res = await getToken();
    if(!res?.token){
      const newToken = await handleRefresh();
      if(newToken)
        headers.set('Authorization', `Bearer ${newToken}`);
    }
    if (res?.token) {
      headers.set('Authorization', `Bearer ${res?.token}`);
    }
  }, 
});

const mutex = new Mutex();
export const baseQueryWithExpire:BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  const result = await baseQuery(args, api, extraOptions);
  if (result.error &&
    (result.error.status === 401)) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
      try{
        const newToken = await handleRefresh();
        if(newToken){
          const newResult = await baseQuery(args, api, extraOptions);
          if(!newResult.error) return newResult;
        }
        api.dispatch(startLogout());
      }finally{
        release();
      }
    }
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
  baseQuery: baseQueryWithExpire,
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