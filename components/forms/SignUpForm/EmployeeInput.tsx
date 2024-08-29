import { UseFormReturnType } from '@mantine/form';
import { FunctionComponent } from 'react';
import { Space, TextInput } from '@mantine/core';
import { SignUpFormValues } from './types';

interface EmployeeInputProps {
  form: UseFormReturnType<SignUpFormValues>,
}

const EmployeeInput: FunctionComponent<EmployeeInputProps> = ({ form }) => (
    <>
    <TextInput
      label="Фамилия сотрудника"
      placeholder="Иванов"
      key={form.key('surname')}
      {...form.getInputProps('surname')}
    />
    <Space h="xs" />
    <TextInput
      label="Табельный номер"
      placeholder="52351"
      type="number"
      key={form.key('personnelNumber')}
      {...form.getInputProps('personnelNumber')}
    />
    </>
  );

export default EmployeeInput;
