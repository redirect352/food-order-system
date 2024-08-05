'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@mantine/core';
import { IconShieldCheckFilled } from '@tabler/icons-react';
import { useSearchParamValue } from '@/shared/hooks';
import { ChangePasswordForm, SuccessMessageCard } from '@/components';
import { NotificationService } from '@/shared/services';

interface confirmationPageProps {
}

const ConfirmationPage: FunctionComponent<confirmationPageProps> = () => {
  const token = useSearchParamValue<string>('token');
  const router = useRouter();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!token) {
      NotificationService.showForbiddenNotification({
        title: 'Ошибка!',
        message: 'Данная страница доступна только по ссылке',
      });
      router.replace('/');
    }
  }, [token]);
  return (
    <Stepper
      active={active}
      styles={{ steps: { display: 'none' }, content: { padding: 0 } }}
    >
      <Stepper.Step>
        <ChangePasswordForm onFormSuccess={() => setActive(1)} />
      </Stepper.Step>
      <Stepper.Step>
        <SuccessMessageCard>
          <SuccessMessageCard.Icon size={100}>
            <IconShieldCheckFilled size={100} stroke={1.5} />
          </SuccessMessageCard.Icon>
          <SuccessMessageCard.Title>
            Пароль успешно изменен!
          </SuccessMessageCard.Title>
          <SuccessMessageCard.Text>
            Пароль изменен, для просмотра меню войдите в систему
          </SuccessMessageCard.Text>
          <SuccessMessageCard.OkButton redirectLink="/login">
            На страницу входа
          </SuccessMessageCard.OkButton>
        </SuccessMessageCard>
      </Stepper.Step>
    </Stepper>

  );
};

export default ConfirmationPage;
