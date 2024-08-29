'use client';

import { Button, Card, Divider, Group, Stepper, Title } from '@mantine/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { passwordStrength } from 'check-password-strength';
import { IconUsers } from '@tabler/icons-react';
import classes from './styles.module.scss';
import OfficeSelect from './OfficeSelect';
import { SignUpFormValues } from './types';
import EmployeeInput from './EmployeeInput';
import { useLazyCheckEmployeeQuery } from '@/lib/api/registrationApi';
import { NotificationService } from '@/shared/services';
import { ErrorDto } from '@/shared/types';
import CredentialsInput from './CredentialsInput';
import { useSignUpMutation } from '@/lib/api/authApi';
import { SuccessMessageCard } from '@/components/cards/SuccessMessageCard/SuccessMessageCard';

interface SignUpFormProps {

}

export const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      office: '',
      surname: '',
      personnelNumber: '',
      login: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          office: values.office.length === 0
            ? 'Выберите филиал'
            : null,
        };
      }
      if (active === 1) {
        return {
          surname: values.surname.length < 3
            ? 'Фамилия должна содержать минимум 3 символа'
            : null,
          personnelNumber: values.personnelNumber.length < 3
          ? 'Табельный номер должна содержать минимум 3 символа'
          : null,
        };
      }
      if (active === 2) {
        return {
          login: values.login.length < 5 || values.login.includes('@') ?
          'Логин должен содержать не менее 5 символов и не должен содержать символ @' : null,
          password: passwordStrength(values.password).id < 2 ?
          'Пароль должен содержать не менее 8 символов,  1 цифру, маленькую и большую буквы и 1 спецсимвол (!№%*&).' : null,
          passwordRepeat: values.password !== values.passwordRepeat ?
          'Пароли не совпадают' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Некорректный email',
        };
      }
      return {};
    },
  });

  const [trigger, checkResult] = useLazyCheckEmployeeQuery();
  const [signUp, signUpResult] = useSignUpMutation();

  const nextStep = () => {
    if (form.validate().hasErrors) {
      return;
    }
    if (active === 1) {
      const { office, surname, personnelNumber } = form.getValues();
      trigger({ officeId: office, surname, personnelNumber });
      return;
    }
    if (active === 2) {
      const { passwordRepeat, office, ...body } = form.getValues();
      signUp({ officeId: office, ...body });
      return;
    }
    setActive((current) => current < 3 ? current + 1 : current);
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (!checkResult.isFetching && checkResult.isSuccess) {
      setActive(2);
    } else if (checkResult.isError) {
      const { error } = checkResult;
      NotificationService.showErrorNotification({
        message: (error as ErrorDto)?.message ??
        'Ошибка! Сотрудника с указанными данными не существует',
        autoClose: 15000,
      });
    }
  }, [checkResult]);

  useEffect(() => {
    if (signUpResult.isSuccess && !signUpResult.isLoading) {
      setActive(3);
    } else if (signUpResult.isError) {
      const { error } = signUpResult;
      NotificationService.showErrorNotification({
        message: (error as ErrorDto)?.message ??
        'Ошибка регистрации ',
        autoClose: 15000,
      });
    }
  }, [signUpResult]);

  return (
    <Card className={classes.signUpContainer}>
      <Title order={2} ta="center">Регистрация</Title>
      <Divider my="md" visibleFrom="sm" />
      <Stepper
        active={active}
        classNames={{ steps: classes.steps }}
      >
        <Stepper.Step label="Первый шаг" description="Выбор филиала">
          <OfficeSelect form={form} setLoading={setIsLoading} />
        </Stepper.Step>
        <Stepper.Step
          label="Второй шаг"
          description="Выбор сотрудника"
          loading={checkResult.isFetching}
        >
          <EmployeeInput form={form} />
        </Stepper.Step>
        <Stepper.Step label="Третий шаг" description="Создание аккаунта">
          <CredentialsInput form={form} />
        </Stepper.Step>
        <Stepper.Completed>
        <SuccessMessageCard>
          <SuccessMessageCard.Icon size={100}>
            <IconUsers size={100} stroke={1.5} />
          </SuccessMessageCard.Icon>
          <SuccessMessageCard.Title>
            Аккаунт создан!
          </SuccessMessageCard.Title>
          <SuccessMessageCard.Text>
            Аккаунт успешно создан.
            Вам на электронную почту было направлено письмо для подтверждения email.
            Для окончания Регистрации в системе следуйте инструкциям в письме
          </SuccessMessageCard.Text>
          <SuccessMessageCard.OkButton redirectLink="/">
            На главную
          </SuccessMessageCard.OkButton>
        </SuccessMessageCard>
        </Stepper.Completed>
      </Stepper>
      <Divider my="md" display={active === 3 ? 'none' : 'default'} />
      <Group justify="flex-end" style={{ justifySelf: 'flex-end' }}>
        {active !== 0 && active !== 3 && (
          <Button variant="default" onClick={prevStep} disabled={checkResult.isLoading}>
            Назад
          </Button>
        )}
        {
          active !== 3 &&
          <Button
            onClick={nextStep}
            loading={isLoading || checkResult.isFetching}
          >
            Далее
          </Button>
        }
      </Group>
    </Card>
    );
};
