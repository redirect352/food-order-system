'use client';

import { MantineProvider } from '@mantine/core';
import LogoutProvider from './LogoutProvider';
import StoreProvider from './StoreProvider';
import { resolver, theme } from '@/theme';
import NotificationProvider from './NotificationProvider';
import { ModalsProvider } from './ModalsProvider';

export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <StoreProvider>
        <LogoutProvider>
          <ModalsProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </ModalsProvider>
        </LogoutProvider>
      </StoreProvider>
    </MantineProvider>

  );
}
