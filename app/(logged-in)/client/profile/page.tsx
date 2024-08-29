'use client';

import { FunctionComponent } from 'react';
import { Card, Text, rem, Skeleton, Stack, TextInput, Button } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useGetOwnInfoQuery } from '@/lib/api/userApi';
import classes from './styles.module.scss';
import { useLogout } from '@/shared/hooks';

interface ProfilePageProps {

}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { isLoading, data } = useGetOwnInfoQuery({});
  const { logout } = useLogout();
  const router = useRouter();
  return (
    <><Card className={classes.box} radius="xl">
      {isLoading ?
        <Skeleton w="100%" h={300}></Skeleton>
        :
        <Stack gap={8}>
          <Text>
            {`${data?.surname} ${data?.name} ${data?.patronymic}`}
          </Text>
          <TextInput
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            value={`${data?.surname} ${data?.name} ${data?.patronymic}`}
            disabled
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Email"
            placeholder="ponomarev@minsktrans.by"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            value={data?.email}
            disabled
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Табельный номер"
            placeholder="000000"
            value={data?.personnelNumber}
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
