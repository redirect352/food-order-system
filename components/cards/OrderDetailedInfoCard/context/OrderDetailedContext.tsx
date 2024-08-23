import { createContext } from 'react';
import { ErrorDto, OrderFullInfoDto } from '@/shared/types';

export const OrderDetailedContext = createContext<{
  order?: OrderFullInfoDto,
  error?: ErrorDto,
  IsLoading?: boolean,
}>({
  order: undefined,
  error: undefined,
  IsLoading: false,
});
