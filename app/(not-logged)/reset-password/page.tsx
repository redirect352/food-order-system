'use client';

import { FunctionComponent, useState } from 'react';
import { Stepper } from '@mantine/core';
import { IconMailForward } from '@tabler/icons-react';
import { SuccessMessageCard, ResetPasswordForm } from '@/components';

const PasswordReset: FunctionComponent<{}> = () => {
  const [active, setActive] = useState(0);
  return (
    <Stepper
      active={active}
      styles={{ steps: { display: 'none' }, content: { padding: 0 } }}
    >
      <Stepper.Step>
        <ResetPasswordForm onFormSuccess={() => setActive(1)} />
      </Stepper.Step>
      <Stepper.Step>
        <SuccessMessageCard>
          <SuccessMessageCard.Icon size={100}>
            <IconMailForward size={100} stroke={1} />
          </SuccessMessageCard.Icon>
          <SuccessMessageCard.Title>
            Запрос на восстановление пароля принят!<br />
          </SuccessMessageCard.Title>
          <SuccessMessageCard.Text>
            Вам на почту направлено письмо восстановления пароля,
            перейдите по ссылке в письме для изменения пароля
          </SuccessMessageCard.Text>
          <SuccessMessageCard.OkButton redirectLink="/">
            На главную
          </SuccessMessageCard.OkButton>
        </SuccessMessageCard>
      </Stepper.Step>
    </Stepper>
  );
};
export default PasswordReset;
