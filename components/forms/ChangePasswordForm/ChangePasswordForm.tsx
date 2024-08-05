'use client';

import { Button, Divider, Group, Paper, PasswordInput, Stack, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useForm } from '@mantine/form';
import { passwordStrength } from 'check-password-strength';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import classes from './styles.module.scss';
import { useSearchParamValue } from '@/shared/hooks';
import { NotificationService } from '@/shared/services';
import { useChangePasswordMutation } from '@/lib/api/authApi';

interface FirstAuthFormProps {

  onFormSuccess: () => void,
}

const FirstAuthForm: FunctionComponent<FirstAuthFormProps> = ({ onFormSuccess }) => {
  const router = useRouter();
  const token = useSearchParamValue<string>('token');
  const form = useForm({
    initialValues: {
      newPassword: '',
      newPasswordRepeat: '',
    },
    validate: {
      newPassword: (val) => (passwordStrength(val).id < 2 ?
      'Пароль должен содержать не менее 8 символов,  1 цифру, маленькую и большую буквы и 1 спецсимвол (!№%*&).' : null),
      newPasswordRepeat: (val, { newPassword }) => (val !== newPassword ?
      'Пароли не совпадают' : null),
    },
  });
  const [changePassword, result] = useChangePasswordMutation();
  const onSubmit = form.onSubmit(({ newPassword }) => {
    if (!token) return;
    changePassword({ token, newPassword }).then(({ error }) => {
      if (error) {
        if ((error as any).status === 401) {
          NotificationService.showForbiddenNotification({
            title: 'Ссылка изменения пароля недействительна',
            message: 'Запросите новую ссылку для изменения пароля',
          });
          router.replace('/login');
          return;
        }
        NotificationService.showErrorNotification({
          title: 'Ошибка выполнения запроса',
          message: ((error as FetchBaseQueryError).data as any)?.message ?? 'Запрос завершился с ошибкой. Попробуйте еще раз через некоторое время',
        });
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
      <Text className={classes.header} component="div" pb="sm">
        Изменениe пароля
      </Text>
      <Text c="dimmed" size="xs" ta="center">
        придумайте новый пароль и нажмите &apos;Далее&apos;
      </Text>
      <Divider my="sm" />
      <form onSubmit={onSubmit}>
        <Stack>
          <PasswordInput
            required
            label="Новый пароль"
            placeholder="**********"
            value={form.values.newPassword}
            onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
            error={form.errors.newPassword}
            radius="md"
            disabled={result.isLoading}
          />
          <PasswordInput
            required
            label="Повторите пароль"
            placeholder="**********"
            value={form.values.newPasswordRepeat}
            onChange={(event) => form.setFieldValue('newPasswordRepeat', event.currentTarget.value)}
            error={form.errors.newPasswordRepeat}
            radius="md"
            disabled={result.isLoading}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            radius="xl"
            loading={result.isLoading}
          >
            Далее
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
export default FirstAuthForm;
