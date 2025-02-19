'use client';

import { MantineProvider } from '@mantine/core';
import LogoutProvider from './LogoutProvider';
import StoreProvider from './StoreProvider';
import { resolver, theme } from '@/theme';
import NotificationProvider from './NotificationProvider';
import { ModalsProvider } from './ModalsProvider';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ru';
import InitializationProvider from './InitializationProvider';


export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <StoreProvider>
        <InitializationProvider>
          <LogoutProvider>
            <ModalsProvider>
              <NotificationProvider>
                <DatesProvider settings={{ locale: 'ru' }}>
                    {children}
                </DatesProvider>
              </NotificationProvider>
            </ModalsProvider>
          </LogoutProvider>
        </InitializationProvider>
      </StoreProvider>
    </MantineProvider>

  );
}
