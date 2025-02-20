import { createContext } from 'react';
import { ErrorDto, OrderFullInfoDto } from '@/shared/types';

export const OrderDetailedContext = createContext<{
  order?: OrderFullInfoDto,
  issuedLabel: string,
  error?: ErrorDto,
  IsLoading?: boolean,
}>({
  order: undefined,
  issuedLabel: "",
  error: undefined,
  IsLoading: false,
});
