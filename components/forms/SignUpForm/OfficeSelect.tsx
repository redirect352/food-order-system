import { UseFormReturnType } from '@mantine/form';
import { FunctionComponent, useEffect } from 'react';
import { Select } from '@/UI';
import { SignUpFormValues } from './types';
import { useGetOfficesListQuery } from '@/lib/api/registrationApi';
import { NotificationService } from '@/shared/services';
import { ErrorDto } from '@/shared/types';

interface OfficeSelectProps {
  form: UseFormReturnType<SignUpFormValues>,
  setLoading: (state: boolean) => void,
}

const OfficeSelect: FunctionComponent<OfficeSelectProps> = ({
  form,
  setLoading,
  }) => {
  const { data, isFetching, error } = useGetOfficesListQuery();
  useEffect(() => { setLoading(isFetching); }, [isFetching]);
  useEffect(() => {
    if (error) {
      NotificationService.showErrorNotification({ message: (error as ErrorDto)?.message ?? 'Ошибка загрузки списка филиалов' });
    }
  }, [error]);
  return (
    <Select
      searchable
      disabled={!data}
      data={data?.map(item => ({ value: item.id.toString(), label: item.name }))}
      key={form.key('office')}
      {...form.getInputProps('office')}
    />
  );
};

export default OfficeSelect;
