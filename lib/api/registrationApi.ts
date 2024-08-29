import { OfficeDto } from '@/shared/types';
import { baseApiWithoutAuth, transformErrorResponse } from './baseApi';

interface CheckEmployeeParams {
  officeId: string,
  surname: string,
  personnelNumber: string,
}

const registrationApi = baseApiWithoutAuth.injectEndpoints({
  endpoints: (builder) => ({
    getOfficesList: builder.query<OfficeDto[], void>({
      query: () => '/branch-office/registration-list',
      transformErrorResponse,
    }),
    checkEmployee: builder.query<any, CheckEmployeeParams>({
      query: (params) => ({
        url: '/auth/sign-up/check-employee',
        params,
      }),
      transformErrorResponse,
    }),
  }),
});
export const {
  useGetOfficesListQuery,
  useLazyCheckEmployeeQuery,
} = registrationApi;
