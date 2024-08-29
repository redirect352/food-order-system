'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconShieldCheck } from '@tabler/icons-react';
import { LoadingOverlay } from '@mantine/core';
import { useSearchParamValue } from '@/shared/hooks';
import { useLazyCheckFirstAuthTokenQuery } from '@/lib/api/authApi';
import { SuccessMessageCard } from '@/components';
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
    } else if (active !== 1) {
      checkToken({ token }).then(res => {
        if (res.error) {
          NotificationService.showErrorNotification({
            title: 'Ошибка! Ссылка активации недействительна!',
            message: 'Время действия ссылки истекло. Повторно войдите в систему для активации аккаунта',
          });
          router.replace('/login');
        } else {
          setActive(1);
        }
      });
    }
  }, [token]);
  return (
    <SuccessMessageCard pos="relative">
      <LoadingOverlay visible={!result.isSuccess} overlayProps={{ blur: 6 }} />
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
  );
};

export default ConfirmationPage;
