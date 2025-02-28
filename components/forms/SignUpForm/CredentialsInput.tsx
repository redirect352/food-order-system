import { Space, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FunctionComponent, useState } from 'react';
import { SignUpFormValues } from './types';
import { PasswordStrength } from '../../../UI/PasswordWithStrengthMeter/PasswordWithStrengthMeter';

interface CredentialsInputProps {
  form: UseFormReturnType<SignUpFormValues>
}

const CredentialsInput: FunctionComponent<CredentialsInputProps> = ({ form }) => {
  const [passValue, setPasswordValue] = useState('');
  form.watch('password', ({ value }) => setPasswordValue(value));
  return (
    <>
      <TextInput
        label="логин"
        placeholder="login"
        key={form.key('login')}
        {...form.getInputProps('login')}
      />
      <Space h="xs" />
      <TextInput
        label="Email"
        placeholder="employee@minsktrans.by"
        type="email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Space h="xs" />
      <PasswordStrength
        checkValue={passValue}
        label="Пароль"
        placeholder="********"
        type="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <TextInput
        label="Повторите пароль"
        placeholder="********"
        type="password"
        key={form.key('passwordRepeat')}
        {...form.getInputProps('passwordRepeat')}
      />
    </>
  );
};

export default CredentialsInput;
