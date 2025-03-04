'use client';

import { Avatar, Group, GroupProps, Skeleton, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import classes from './styles.module.scss';
import { useGetOwnInfoQuery } from '@/lib/api/userApi';

interface UserAvatarProps extends GroupProps {

}

export const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
  const { isLoading, data } = useGetOwnInfoQuery({});
  const name = `${data?.surname} ${data?.name}`;
  const router = useRouter();
  return (
    <Group
      {...props}
      className={[classes.group, props.className].join(' ')}
      onClick={() => router.push('/profile')}
    >
      {
        isLoading ?
          <>
            <Avatar className={classes.groupAvatar} />
            <Skeleton w={200} h={24} />
          </>
        :
      (
        <>
          <Avatar
            className={classes.groupAvatar}
            color="initials"
            name={name}
          />
          <Text className={classes.groupText} fw={500}>{name}</Text>
        </>
        )
      }

    </Group>
  );
};
