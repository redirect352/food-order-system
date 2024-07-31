'use client';

import { Button, Divider, Group, Paper, PasswordInput, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useForm } from '@mantine/form';
import { passwordStrength } from 'check-password-strength';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { SerializedError } from '@reduxjs/toolkit';
import classes from './styles.module.scss';
import { useChangeCredentialsMutation } from '@/lib/api/authApi';
import { useSearchParamValue } from '@/shared/hooks';
import { NotificationService } from '@/shared/services';

interface FirstAuthFormProps {
  userBasicData?: {
    name: {
      firstName: string,
      lastName: string,
      patronymic: string,
    },
    login: string,
  },
  onFormSuccess: () => void,
}

const FirstAuthForm: FunctionComponent<FirstAuthFormProps> = ({ userBasicData, onFormSuccess }) => {
  const router = useRouter();
  const token = useSearchParamValue<string>('token');
  const form = useForm({
    initialValues: {
      newLogin: userBasicData?.login ?? '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    validate: {
      newLogin: (val) => val.length < 5 ?
      'Логин должен содержать не менее 5 символов' : null,
      newPassword: (val) => (passwordStrength(val).id < 2 ?
      'Пароль должен содержать не менее 8 символов,  1 цифру, маленькую и большую буквы и 1 спецсимвол (!№%*&).' : null),
      newPasswordRepeat: (val, { newPassword }) => (val !== newPassword ?
      'Пароли не совпадают' : null),
    },
  });
  const [changeCredentials] = useChangeCredentialsMutation();
  const inputDisabledState = userBasicData === undefined;
  const username = userBasicData ? `${userBasicData?.name.firstName} ${userBasicData?.name.patronymic}` : <Skeleton w="200px" h="md" />;
  const onSubmit = form.onSubmit(({ newLogin, newPassword }) => {
    if (!token) return;
    changeCredentials({ token, newLogin, newPassword }).then(({ error }) => {
      if (error) {
        if ((error as FetchBaseQueryError).status === 401) {
          NotificationService.showErrorNotification({
            title: 'Ошибка!',
            message: 'Ссылка недействительна. Авторизуйтесь снова для получения актуальной ссылки',
          });
          router.replace('/sign-in');
        } else {
          NotificationService.showErrorNotification({
            title: 'Ошибка!',
            message: (error as SerializedError).message ?? 'Ошибка выполнения запроса',
          });
        }
      } else {
        onFormSuccess();
      }
    });
  });
  return (
    <Paper
      className={classes.firstAuthFormBox}
      radius="md"
      p="xl"
      withBorder
    >
      <Text className={classes.header} component="div">
        Здравствуйте, {username}
      </Text>
      <Text c="dimmed" size="xs" ta="center">
        для окончания регистрации придумайте логин и пароль и нажмите &apos;Далее&apos;
      </Text>
      <Divider mb="sm" />
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            required
            label="Новый логин"
            placeholder="ivanov"
            value={form.values.newLogin}
            onChange={(event) => form.setFieldValue('newLogin', event.currentTarget.value)}
            error={form.errors.newLogin}
            radius="md"
            disabled={inputDisabledState}
          />

          <PasswordInput
            required
            label="Новый пароль"
            placeholder="**********"
            value={form.values.newPassword}
            onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
            error={form.errors.newPassword}
            radius="md"
            disabled={inputDisabledState}
          />
          <PasswordInput
            required
            label="Повторите пароль"
            placeholder="**********"
            value={form.values.newPasswordRepeat}
            onChange={(event) => form.setFieldValue('newPasswordRepeat', event.currentTarget.value)}
            error={form.errors.newPasswordRepeat}
            radius="md"
            disabled={inputDisabledState}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            radius="xl"
            loading={userBasicData === undefined}
          >
            Далее
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
export default FirstAuthForm;
