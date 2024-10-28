import { FunctionComponent, useEffect, useState } from 'react';
import { MultiSelect, Select } from '@/UI';
import { useGetOfficesListQuery } from '@/lib/api/registrationApi';
import { NotificationService } from '@/shared/services';
import { ErrorDto } from '@/shared/types';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { __InputWrapperProps, BoxProps, ComboboxLikeProps, ElementProps, InputProps, SelectProps } from '@mantine/core';
import { useOfficeList } from '../../shared/hooks/useOfficeList';

type OfficeSelectProps = {
  inputKey: string,
  inputProps: GetInputPropsReturnType,
  setLoading?: (state: boolean) => void,
  isCanteen?: boolean,
} & ElementProps<'input', 'size'> & ComboboxLikeProps & __InputWrapperProps;

const OfficeSelect: FunctionComponent<OfficeSelectProps> = ({
  inputProps, 
  inputKey,
  setLoading,
  isCanteen = false,
  ...selectProps
  }) => {
  const { data, isFetching, error } = useOfficeList(isCanteen);
  useEffect(() => { if(setLoading) setLoading(isFetching); }, [isFetching]);
  useEffect(() => {
    if (error) {
      NotificationService.showErrorNotification({ message: (error as ErrorDto)?.message ?? 'Ошибка загрузки списка филиалов' });
    }
  }, [error]);
  
  if(Array.isArray(inputProps.defaultValue) || Array.isArray(inputProps.value)){
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
