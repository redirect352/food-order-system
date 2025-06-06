'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectIsLoggingOut } from '@/lib/features/user/userSlice';
import { useAppSelector, useLogout } from '@/shared/hooks';
import { NotificationService } from '@/shared/services';
import { LoadingOverlay } from '@mantine/core';

export default function LogoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isLoggingOut = useAppSelector(selectIsLoggingOut);
  const { logout } = useLogout();
  const router = useRouter();
  useEffect(() => {
    if (isLoggingOut) {
      NotificationService.showErrorNotification({
        title: 'Срок действия авторизации истек.',
        message: 'Для продолжения работы войдите в систему',
      });
      logout().then(() => router.replace('/'));
    }
  }, [isLoggingOut]);
  return (
    <>
      <LoadingOverlay 
        visible={isLoggingOut} 
        title='Выход'
      />
      {children}
    </>
  );
}
