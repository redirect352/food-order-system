'use client';

import { FunctionComponent } from 'react';
import { Card, Text, rem, Skeleton, Stack, TextInput, Button, SegmentedControl } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useGetOwnInfoQuery } from '@/lib/api/userApi';
import classes from './styles.module.scss';
import { useLogout } from '@/shared/hooks';
import { InterfaceControl } from '@/components';
import { ErrorPage } from '@/UI';
import { formatFullName } from '@/shared/helpers/formatHelper';

interface ProfilePageProps {

}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { isLoading, data, error } = useGetOwnInfoQuery(undefined);
  const { logout } = useLogout();
  const router = useRouter();
  if(error) return <ErrorPage message={(error as any)?.message ?? 'Невозможно получить данные пользователя'}/>
  const fullName = formatFullName(data?.employee);
  return (
    <><Card className={classes.box} radius="xl">
      {isLoading ?
        <Skeleton w="100%" h={300}></Skeleton>
        :
        <Stack gap={8}>
          <TextInput
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            value={fullName}
            disabled
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Email"
            placeholder="example@minsktrans.by"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            value={data?.email}
            disabled
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Табельный номер"
            placeholder="000000"
            value={data?.employee.personnelNumber}
            disabled
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Место работы"
            placeholder=""
            value={`${data?.office?.name}, ${data?.office?.address}`}
            disabled
            classNames={{ input: classes.input }}
          />
          <InterfaceControl />
        </Stack>}
      </Card>
      <Button
        variant="outline"
        radius="xl"
        mt="xl"
        onClick={() => { logout(); router.replace('/'); }}
      >
        Выйти из системы
      </Button>
    </>
  );
};

export default ProfilePage;
