'useClient';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectIsLoggingOut } from '@/lib/features/user/userSlice';
import { useAppSelector, useLogout } from '@/shared/hooks';
import { NotificationService } from '@/shared/services';

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
  return <>{children}</>;
}
