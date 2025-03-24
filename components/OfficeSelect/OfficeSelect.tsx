'use client';

import { FunctionComponent, useEffect } from 'react';
import { MultiSelect, Select } from '@/UI';
import { NotificationService } from '@/shared/services';
import { ErrorDto } from '@/shared/types';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { __InputWrapperProps,  ComboboxLikeProps, ElementProps} from '@mantine/core';
import { useOfficeList } from '@/shared/hooks/useOfficeList';

export type OfficeSelectProps = {
  inputKey?: string,
  inputProps?: GetInputPropsReturnType,
  setLoading?: (state: boolean) => void,
  officeType?: Parameters<typeof useOfficeList>[0],
} & ElementProps<'input', 'size'> & ComboboxLikeProps & __InputWrapperProps;

const OfficeSelect: FunctionComponent<OfficeSelectProps> = ({
  inputProps, 
  inputKey,
  setLoading,
  officeType = 'office',
  ...selectProps
  }) => {
  const { data, isFetching, error } = useOfficeList(officeType);
  useEffect(() => { if(setLoading) setLoading(isFetching); }, [isFetching]);
  useEffect(() => {
    if (error) {
      NotificationService.showErrorNotification({ message: (error as ErrorDto)?.message ?? 'Ошибка загрузки списка филиалов' });
    }
  }, [error]);
  if(Array.isArray(inputProps?.defaultValue) || Array.isArray(inputProps?.value)){
    return ( 
      <MultiSelect 
        searchable
        {...selectProps}
        data={data?.map(item => ({ value: item.id.toString(), label: item.name })) ?? []}
        key={inputKey}
        {...inputProps}
      />
    )
  }else{
    return (
      <Select
        searchable
        disabled={!data}
        data={data?.map(item => ({ value: item.id.toString(), label: item.name }))}
        key={inputKey}
        {...selectProps}
        {...inputProps}
      />
    );
  }
};

export default OfficeSelect;
