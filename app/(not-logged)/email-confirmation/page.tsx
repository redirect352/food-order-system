'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@mantine/core';
import { IconShieldCheck } from '@tabler/icons-react';
import { useSearchParamValue } from '@/shared/hooks';
import { useLazyCheckFirstAuthTokenQuery } from '@/lib/api/authApi';
import { FirstAuthForm, SuccessMessageCard } from '@/components';
import { NotificationService } from '@/shared/services';

interface confirmationPageProps {
}

const ConfirmationPage: FunctionComponent<confirmationPageProps> = () => {
  const token = useSearchParamValue<string>('token');
  const router = useRouter();
  const [checkToken, result] = useLazyCheckFirstAuthTokenQuery();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!token) {
      NotificationService.showForbiddenNotification({
        title: 'Ошибка!',
        message: 'Данная страница доступна только по ссылке',
      });
      router.replace('/');
    } else {
      checkToken({ token }).then(res => {
        if (res.error) {
          NotificationService.showErrorNotification({
            title: 'Ошибка! Ссылка активации недействительна!',
            message: 'Время действия ссылки истекло. Повторно войдите в систему для активации аккаунта',
          });
          router.replace('/login');
        }
      });
    }
  }, [token]);
  return (
    <Stepper
      active={active}
      styles={{ steps: { display: 'none' }, content: { padding: 0 } }}
    >
      <Stepper.Step>
        <FirstAuthForm
          userBasicData={result.data?.user}
          onFormSuccess={() => setActive(1)}
        />
      </Stepper.Step>
      <Stepper.Step>
        <SuccessMessageCard>
          <SuccessMessageCard.Icon size={100}>
            <IconShieldCheck size={100} stroke={1.5} />
          </SuccessMessageCard.Icon>
          <SuccessMessageCard.Title>
            Аккаунт активирован!
          </SuccessMessageCard.Title>
          <SuccessMessageCard.Text>
            Аккаунт успешно активирован, для просмотра меню войдите в систему
          </SuccessMessageCard.Text>
          <SuccessMessageCard.OkButton redirectLink="/login">
            Далее
          </SuccessMessageCard.OkButton>
        </SuccessMessageCard>
      </Stepper.Step>
    </Stepper>

  );
};

export default ConfirmationPage;
